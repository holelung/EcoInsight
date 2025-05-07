package com.semi.ecoinsight.authboard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.vo.Board;

@Mapper
public interface AuthBoardMapper {
	
	void insertAuthBoard(Board board);
	
	List<BoardDTO> selectAuthBoardList();
	
	Long getAuthBoardNo(Long memberNo);
	
	void updateAuthBoard(Board board);
	
	void deleteAuthBoard(Long boardNo);
	
	BoardDTO selectAuthBoardById(Long boardNo);
}
