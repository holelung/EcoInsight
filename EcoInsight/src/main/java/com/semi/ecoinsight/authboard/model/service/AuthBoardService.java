package com.semi.ecoinsight.authboard.model.service;

import java.util.List;

import com.semi.ecoinsight.authboard.model.dto.AuthBoardDTO;

public interface AuthBoardService {
	void insertAuthBoard(AuthBoardDTO authboard);
	List<AuthBoardDTO> selectAuthBoardList(Long boardNo);
}
