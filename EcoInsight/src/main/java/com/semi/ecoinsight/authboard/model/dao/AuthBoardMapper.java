package com.semi.ecoinsight.authboard.model.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import com.semi.ecoinsight.board.model.vo.Board;

@Mapper
public interface AuthBoardMapper {
	@Insert("INSERT INTO TB_AUTH_BOARD (BOARD_TITLE, BOARD_CONTENT, CATEGORY_ID, MEMBER_NO) VALUES (#{boardTitle}, #{boardContent}, #{category}, #{memberNo})")
	void insertAuthBoard(Board board);
	
	Long getAuthBoardNo(Long memberNo);
	
	@Update("UPDATE TB_AUTH_BOARD SET BOARD_TITLE = #{boardTitle}, BOARD_CONTENT = #{boardContent} WHERE BOARD_NO = #{boardNo}")
	void update(Board board);
	
	@Delete("DELETE FROM TB_AUTH_BOARD WHERE BOARD_NO = #{boardNo}")
	void delete(Long boardNo);
}
