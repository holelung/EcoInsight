package com.semi.ecoinsight.authboard.model.service;

import java.util.List;
import java.util.Map;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.dto.LikeDTO;

public interface AuthBoardService {

	Map<String,Object> selectAuthBoardList(int pageNo, int size, String search, String searchType,
            String sortOrder, String categoryId);

	BoardDTO selectAuthBoardDetail(Long boardNo, String categoryId);
	
	void insertAuthBoard(WriteFormDTO form);
	void deleteAuthBoard(Long boardNo);
	void updateAuthBoard(WriteFormDTO form);
	
	void handleLikeCount(LikeDTO like);
}