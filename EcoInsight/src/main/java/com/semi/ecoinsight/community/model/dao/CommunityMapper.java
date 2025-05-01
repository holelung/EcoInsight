package com.semi.ecoinsight.community.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.vo.Board;

@Mapper
public interface CommunityMapper {
	// 글 작성
	void insertCommunityBoard(Board board);
	
	Long getCommunityNo(Long memberNo);
	
	// 게시글 조회	
	List<BoardDTO> findAllCommunity(String categoryId);
	
	// 검색
	List<BoardDTO> findCommunity(Map<String,String> searchMap );
	
	// 게시글 상세 조회
	
	void detailCommunity()
}
