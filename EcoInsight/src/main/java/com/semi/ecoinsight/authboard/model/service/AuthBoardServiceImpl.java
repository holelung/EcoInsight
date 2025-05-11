package com.semi.ecoinsight.authboard.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.auth.model.service.AuthService;
import com.semi.ecoinsight.authboard.model.dao.AuthBoardMapper;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.dto.LikeDTO;
import com.semi.ecoinsight.board.model.service.BoardService;
import com.semi.ecoinsight.board.model.vo.Attachment;
import com.semi.ecoinsight.board.model.vo.Board;
import com.semi.ecoinsight.board.model.vo.Like;
import com.semi.ecoinsight.exception.util.BoardInsertException;
import com.semi.ecoinsight.exception.util.CommunityAccessException;
import com.semi.ecoinsight.exception.util.CustomSqlException;
import com.semi.ecoinsight.exception.util.ImageInsertException;
import com.semi.ecoinsight.exception.util.InvalidAccessException;
import com.semi.ecoinsight.util.pagination.PaginationService;
import com.semi.ecoinsight.util.sanitize.SanitizingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthBoardServiceImpl implements AuthBoardService {

    private final AuthService authService;
	private final SanitizingService sanitizingService;
	private final PaginationService pagination;
	private final AuthBoardMapper authBoardMapper;
	private final BoardMapper boardMapper;
	private final BoardService boardService;
    // 글 목록 조회
	@Override
	public Map<String,Object> selectAuthBoardList(int pageNo, int size, String search, String searchType, String sortOrder, String categoryId) {
		int startIndex = pagination.getStartIndex(pageNo, size);
        Map<String, String> pageInfo = new HashMap<>();
        pageInfo.put("startIndex", Integer.toString(startIndex));
        pageInfo.put("size", Integer.toString(size));
        pageInfo.put("sortOrder", sortOrder);

        Map<String, Object> resultData = new HashMap<String, Object>();

        if (search.isEmpty()) {
            resultData.put("totalCount", authBoardMapper.selectAuthBoardCount());
            // 10개만 나옴
            resultData.put("boardList", authBoardMapper.selectAuthBoardList(pageInfo));
            
            return resultData;
        }
        pageInfo.put("search", search);
        pageInfo.put("searchType", searchType);

        resultData.put("totalCount", authBoardMapper.selectAuthBoardCountBySearch(pageInfo));
        resultData.put("boardList", authBoardMapper.selectAuthBoardListBySearch(pageInfo));
        return resultData;
	}

    // 글 조회
    @Transactional
	@Override
    public BoardDTO selectAuthBoardDetail(Long boardNo, String categoryId) {
        if (boardNo < 1l) {
            throw new InvalidAccessException("유효한 접근이 아닙니다.");
        }

        try{
            authBoardMapper.increaseViewCount(boardNo);
            boardService.insertViewCount(boardNo, categoryId);
        } catch (RuntimeException e) {
            throw new BoardInsertException("조회수 증가 실패");
        }
		return authBoardMapper.selectAuthBoardDetail(boardNo);
	}

    // 글 작성
    @Transactional
	@Override
	public void insertAuthBoard(WriteFormDTO form) {
		
        Board board = Board.builder()
                .memberNo(form.getMemberNo())
                .categoryId(form.getCategoryId())
                .boardTitle(form.getTitle())
                .boardContent(form.getContent())            
                .build();
        try {
            authBoardMapper.insertAuthBoard(board);
        } catch (RuntimeException e) {
            throw new BoardInsertException("게시글 생성에 실패했습니다.");
        }
        
        Long authBoardNo = authBoardMapper.selectAuthBoardNo(form.getMemberNo());
        if (form.getImageUrls() != null) {
            List<Attachment> Attachments = form.getImageUrls().stream()
            .map(url -> Attachment.builder()
                .boardNo(authBoardNo)
                .attachmentItem(url)
                .boardType(form.getBoardType())
                .build()
                ).collect(Collectors.toList());
            for (Attachment a : Attachments) {
                try {                
                    boardMapper.uploadImage(a);
                } catch (RuntimeException e) {
                    throw new ImageInsertException("이미지 업로드에 실패했습니다.");
                }
            }
        }
	}
	
    // 글 삭제
	@Override
	public void deleteAuthBoard(Long boardNo) {
		authBoardMapper.deleteAuthBoard(boardNo);
	}
	
    // 글 수정
    @Transactional
	@Override
    public void updateAuthBoard(WriteFormDTO form) {
        if (!form.getMemberNo().equals(authService.getUserDetails().getMemberNo())) {
            throw new InvalidAccessException("유효하지 않은 접근입니다.");
        }
        Board board = Board.builder()
                .boardNo(form.getBoardNo())
                .categoryId(form.getCategoryId())
                .boardTitle(form.getTitle())
                .boardContent(form.getContent())
                .build();
        try {
            authBoardMapper.updateAuthBoard(board);
        } catch (RuntimeException e) {
            throw new BoardInsertException("게시글 수정에 실패했습니다.");
        }

        if (form.getImageUrls() != null) {
            List<Attachment> Attachments = form.getImageUrls().stream()
                    .map(url -> Attachment.builder()
                            .boardNo(form.getBoardNo())
                            .attachmentItem(url)
                            .boardType(form.getBoardType())
                            .build())
                    .collect(Collectors.toList());
            for (Attachment a : Attachments) {
                try {
                    boardMapper.uploadImage(a);
                } catch (RuntimeException e) {
                    throw new ImageInsertException("추가 이미지 업로드에 실패했습니다.");
                }
            }
        }

    }
    @Transactional
    @Override
    public void handleLikeCount(LikeDTO like) {
        
   
        Like likeData = Like.builder()
                .memberNo(like.getMemberNo())
                .boardNo(like.getBoardNo())
                .build();
        int isLike;

        try{
            isLike = authBoardMapper.selectLikeCount(likeData);
        } catch (RuntimeException e) {
            throw new CustomSqlException("다시 시도해주세요");
        }

        if (isLike != 0) {
            try{
                authBoardMapper.decreaseLikeCount(likeData);
            } catch (RuntimeException e) {
                throw new CustomSqlException("다시 시도해주세요");
            }
        } else {
            try {
                authBoardMapper.increaseLikeCount(likeData);
            } catch (RuntimeException e) {
                throw new CustomSqlException("다시 시도해주세요");
            }
        }
        log.info("\\n뭐야");
    }
    



}