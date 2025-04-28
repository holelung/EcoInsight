package com.semi.ecoinsight.authboard.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.auth.model.service.AuthService;
import com.semi.ecoinsight.authboard.model.dao.AuthBoardMapper;
import com.semi.ecoinsight.authboard.model.dto.AuthBoardDTO;
import com.semi.ecoinsight.board.model.service.BoardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthBoardServiceImpl implements AuthBoardService {
	private final AuthBoardMapper authBoardMapper;
	private final BoardService boardService;
	private final AuthService authService;
	
	@Override
	public void insertAuthBoard(AuthBoardDTO authboard) {
	}
	
	@Override
	public List<AuthBoardDTO> selectAuthBoardList(Long boardNo){
		return null;
	}
}
