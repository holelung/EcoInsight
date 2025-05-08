package com.semi.ecoinsight.authboard.model.service;

import java.util.List;
import java.util.Map;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dto.BoardDTO;

public interface AuthBoardService {

	List<BoardDTO> selectAuthBoardList(Map<String,Object> pageInfo);

	BoardDTO selectAuthBoardDetail(Long boardNo);
	
	void insertAuthBoard(WriteFormDTO form);
	void deleteAuthBoard(Long boardNo);
	void updateAuthBoard(WriteFormDTO form);
}