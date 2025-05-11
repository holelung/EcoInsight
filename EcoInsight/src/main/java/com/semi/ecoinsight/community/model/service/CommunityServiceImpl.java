package com.semi.ecoinsight.community.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.ibatis.session.RowBounds;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.auth.model.service.AuthService;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.service.BoardService;
import com.semi.ecoinsight.board.model.service.BoardServiceImpl;
import com.semi.ecoinsight.board.model.vo.Attachment;
import com.semi.ecoinsight.board.model.vo.Board;
import com.semi.ecoinsight.comment.model.dto.CommentDTO;
import com.semi.ecoinsight.comment.model.vo.Comment;
import com.semi.ecoinsight.community.model.dao.CommunityCommentMapper;
import com.semi.ecoinsight.community.model.dao.CommunityMapper;
import com.semi.ecoinsight.exception.util.BoardInsertException;
import com.semi.ecoinsight.exception.util.CommunityAccessException;
import com.semi.ecoinsight.exception.util.ImageInsertException;
import com.semi.ecoinsight.exception.util.InvalidAccessException;
import com.semi.ecoinsight.util.sanitize.SanitizingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService{
	

	private final CommunityMapper communityMapper;
	private final BoardMapper boardMapper;
	private final CommunityCommentMapper communityCommentMapper;
	private final AuthService authService;
	private final BoardService boardService;

	@Override
	public void insertCommunityBoard(WriteFormDTO form) {

        
        Board board = Board.builder()
                .memberNo(form.getMemberNo())
                .categoryId(form.getCategoryId())
                .boardTitle(form.getTitle())
                .boardContent(form.getContent())            
                .build();
        
        communityMapper.insertCommunityBoard(board);
        
        Long communityNo = communityMapper.getCommunityNo(form.getMemberNo());
        
        if (form.getImageUrls() != null) {
            List<Attachment> attachments = form.getImageUrls().stream()
            .map(url -> Attachment.builder()
                .boardNo(communityNo)
                .attachmentItem(url)
                .boardType(form.getBoardType())
                .build()
                ).collect(Collectors.toList());
            for (Attachment a : attachments) {
                boardMapper.uploadImage(a);
            }
        }	
	}
	
	@Override
	public List<BoardDTO> findAllCommunity(int pageNo, String search, String categoryId) {
		int size = 10;
		
		Map<String,String> searchMap = new HashMap<>();
		searchMap.put("startIndex", Integer.toString(size*pageNo));
		searchMap.put("size", Integer.toString(size));


    if(search == null) {
    	return communityMapper.findAllCommunity(categoryId);  		
    }else {   		

   		
    	searchMap.put("search", search);
    	searchMap.put("categoryId", categoryId);
 		
    	return communityMapper.findCommunity(searchMap);
    }
	}
	
	@Override
	public Map<String, Object> detailCommunity(Long boardNo, String categoryId) {
			
		Map<String,Object> detailMap = new HashMap<>();
		detailMap.put("boardNo", boardNo);
		detailMap.put("categoryId", categoryId);
		
		communityMapper.getCommunityCountView(boardNo);
		BoardDTO board = communityMapper.detailCommunity(detailMap);
		 
		Long likeCount = communityMapper.getLikeCount(boardNo);
		board.setLikeCount(likeCount); // 값을 저장하기 위함
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("board", board);
		boardService.insertViewCount(boardNo, categoryId);
		// "C0001", "C0002", "C0003"
		//C0001 = free
		//C0002 = qna
		//C0003 = tips
		 	
		return resultMap;
	}
	
	@Override
	public Long checkedLike(Map<String, String> likeMap) {
		 Long likeCount = communityMapper.checkedLike(likeMap);
		 
		 if(likeCount == 0) {
			 communityMapper.insertLikeCount(likeMap);
		 } else {
			 communityMapper.deleteLikeCount(likeMap);
		 }
		 
		 Long boardNo = Long.parseLong(likeMap.get("boardNo").toString());

		return communityMapper.getLikeCount(boardNo);

		
	}

	@Override
	public void deleteCommunity(Map<String, Long> deleteMap) {

	
		Long boardNo = deleteMap.get("boardNo");
    Long memberNo = deleteMap.get("memberNo");

    Long writerNo = communityMapper.getWriterMemberNo(boardNo);
 

        if (!writerNo.equals(memberNo)) {
            throw new CommunityAccessException("삭제 권한이 없습니다.");
        }

         communityMapper.deleteCommunity(boardNo);
    }

	@Override
	public void updateCommunity(WriteFormDTO form) {
		Board board = boardBuilder(form);
        try{
            communityMapper.updateCommunity(board);
        }catch(RuntimeException e){
            throw new BoardInsertException("게시글 수정에 실패했습니다.");
        }

        if (form.getImageUrls() != null) {
            List<Attachment> attachments = attachmentsBuilder(form);
            for (Attachment a : attachments) {
                try {
                    boardMapper.uploadImage(a);  
                } catch (RuntimeException e) {
                    throw new ImageInsertException("추가 이미지 업로드에 실패했습니다.");
                } 
            }
        }
		
	}
	
	private Board boardBuilder(WriteFormDTO form) {
		return Board.builder()
                .boardNo(form.getBoardNo())
                .memberNo(form.getMemberNo())
                .categoryId(form.getCategoryId())
                .boardTitle(form.getTitle())
                .boardContent(form.getContent())            
                .build();
		
	}

	private List<Attachment> attachmentsBuilder(WriteFormDTO form) {
		return form.getImageUrls().stream()
                .map(url -> Attachment.builder()
																			.boardNo(form.getBoardNo())
																			.attachmentItem(url)
																			.boardType(form.getBoardType())
																			.build()
                    ).collect(Collectors.toList());
	}

	@Override
	public void insertCommunityComment(CommentDTO comment) {
		
		Long memberNo = authService.getUserDetails().getMemberNo();
		
		if(!memberNo.equals(comment.getMemberNo())) {
			throw new InvalidAccessException("잘못된 접근입니다.");
		}
		
		Comment data = Comment.builder()
													.boardNo(comment.getBoardNo())
													.memberNo(memberNo)
													.commentContent(comment.getCommentContent())
													.parentCommentNo(comment.getParentCommentNo())
													.build();
		
		communityCommentMapper.insertCommunityComment(data);
		
		
	}

	@Override
	public List<CommentDTO> findCommunityCommentList(Long boardNo) {
		return communityCommentMapper.findCommunityCommentList(boardNo);
	}

	@Override
	public Long commentCount(Long boardNo) {
		return communityCommentMapper.commentCount(boardNo);
	}

	@Override
	public void updateComment(CommentDTO comment) {
		communityCommentMapper.updateComment(comment);
		
	}

	@Override
	public void deleteComment(Map<String,Long> deleteCommentMap) {
		Long commentWriter = deleteCommentMap.get("memberNo");
		Long memberNo = authService.getUserDetails().getMemberNo();
	

		if (!commentWriter.equals(memberNo)) {
			throw new CommunityAccessException("삭제 권한이 없습니다.");
		}

	 communityCommentMapper.deleteComment(deleteCommentMap);
	
		
	}


		
	
}

