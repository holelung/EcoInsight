package com.semi.ecoinsight.authboard.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.authboard.model.dao.AuthBoardMapper;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.vo.Attachment;
import com.semi.ecoinsight.board.model.vo.Board;
import com.semi.ecoinsight.util.pagination.PaginationService;
import com.semi.ecoinsight.util.sanitize.SanitizingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthBoardServiceImpl implements AuthBoardService {
	private final SanitizingService sanitizingService;
	private final PaginationService pagination;
	private final AuthBoardMapper authBoardMapper;
	private final BoardMapper boardMapper;
	
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

	@Override
	public BoardDTO selectAuthBoardDetail(Long boardNo) {
		return authBoardMapper.selectAuthBoardDetail(boardNo);
	}


	@Override
	public void insertAuthBoard(WriteFormDTO form) {
		

        Board board = Board.builder()
                .memberNo(form.getMemberNo())
                .categoryId(form.getCategoryId())
                .boardTitle(form.getTitle())
                .boardContent(form.getContent())            
                .build();
        
        authBoardMapper.insertAuthBoard(board);
        
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
                boardMapper.uploadImage(a);
            }
        }
	}
	
	@Override
	public void deleteAuthBoard(Long boardNo) {
		authBoardMapper.deleteAuthBoard(boardNo);
	}
	

	@Override
	public void updateAuthBoard(WriteFormDTO form) {
		Board board = Board.builder()
				.boardNo(form.getBoardNo())
				.categoryId(form.getCategoryId())
				.boardTitle(form.getTitle())
				.boardContent(form.getContent())
				.build();
				
		authBoardMapper.updateAuthBoard(board);
	}


}