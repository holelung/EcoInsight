package com.semi.ecoinsight.authboard.model.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import com.semi.ecoinsight.board.model.vo.Board;

@Mapper
public interface AuthBoardMapper {
	
	void insertAuthBoard(Board board);
	
	void selectAuthBoardList(Board board);
	
	Long getAuthBoardNo(Long memberNo);
	
	void updateAuthBoard(Board board);
	
	void deleteAuthBoard(Long boardNo);
}
