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
	BoardDTO detailCommunity(Map<String,Object> detailMap);

	Long checkedLike(Map<String, String> likeMap);

	// 좋아요버튼 누르면 증가/감소
	void insertLikeCount(Map<String, String> likeMap);
	void deleteLikeCount(Map<String, String> likeMap);
	
	Long getCommunityCountView(Long boardNo);
	Long getLikeCount(Long boardNo);

	Long getWriterMemberNo(Long boardNo);

	// 게시글 삭제
	void deleteCommunity(Long boardNo);
	// 게시글 수정
	void updateCommunity(Board board);

  


	

		
	
}
