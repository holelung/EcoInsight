package com.semi.ecoinsight.community.model.service;

import java.util.List;
import java.util.Map;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dto.BoardDTO;

public interface CommunityService {
	
	// 글 작성
	void insertCommunityBoard(WriteFormDTO form);
	
	// 게시글 조회	
	List<BoardDTO> findAllCommunity(int pageNo, String search, String categoryId);
	
	// 게시글 상세 조회
	Map<String,Object> detailCommunity(Long boardNo, String categoryId);

	Long checkedLike(Map<String, String> likeMap);

	void viewAndLike(Map<String, Object> viewLikeCount);

	
	
}
