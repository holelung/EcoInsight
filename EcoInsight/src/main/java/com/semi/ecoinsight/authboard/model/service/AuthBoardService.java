package com.semi.ecoinsight.authboard.model.service;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;

public interface AuthBoardService {
	void insertAuthBoard(WriteFormDTO form);
	void deleteAuthBoard(Long boardNo);
}