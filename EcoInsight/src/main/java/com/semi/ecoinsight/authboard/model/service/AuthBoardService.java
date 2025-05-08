package com.semi.ecoinsight.authboard.model.service;

import java.util.List;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dto.BoardDTO;

public interface AuthBoardService {
	void insertAuthBoard(WriteFormDTO form);
	void deleteAuthBoard(Long boardNo);
	BoardDTO getAuthBoardDetail(Long boardNo);
	void updateAuthBoard(Long boardNo, WriteFormDTO form);
	List<BoardDTO> getAllAuthBoards();
}