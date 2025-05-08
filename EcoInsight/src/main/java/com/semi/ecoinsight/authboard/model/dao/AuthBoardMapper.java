package com.semi.ecoinsight.authboard.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.vo.Board;
import com.semi.ecoinsight.board.model.vo.Like;

@Mapper
public interface AuthBoardMapper {
	
	// 조회
	List<BoardDTO> selectAuthBoardList(Map<String, String> pageInfo);
	List<BoardDTO> selectAuthBoardListBySearch(Map<String, String> pageInfo);
	
	Long selectAuthBoardCount();
	Long selectAuthBoardCountBySearch(Map<String, String> pageInfo);

	// 세부 조회
	BoardDTO selectAuthBoardDetail(Long boardNo);
	// 조회수 증가
	void increaseViewCount(Long boardNo);

	// 좋아요
	int selectLikeCount(Like like);
	void increaseLikeCount(Like like);
	void decreaseLikeCount(Like like);
	
	// 글작성
	void insertAuthBoard(Board board);
	Long selectAuthBoardNo(Long memberNo);
	
	void updateAuthBoard(Board board);
	void deleteAuthBoard(Long boardNo);
	
	
}
