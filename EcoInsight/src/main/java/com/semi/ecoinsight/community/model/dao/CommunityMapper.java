package com.semi.ecoinsight.community.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.board.model.vo.Board;

@Mapper
public interface CommunityMapper {
	// 글 작성
	void insertCommunityBoard(Board board);
	
	Long getCommunityNo(Long memberNo);
}
