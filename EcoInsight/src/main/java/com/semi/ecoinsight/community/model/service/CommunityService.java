package com.semi.ecoinsight.community.model.service;

import java.util.List;
import java.util.Map;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.comment.model.dto.CommentDTO;

import jakarta.validation.Valid;

public interface CommunityService {
	
	// 글 작성
	void insertCommunityBoard(WriteFormDTO form);
	
	// 게시글 조회	
	List<BoardDTO> findAllCommunity(int pageNo, String search, String categoryId);
	
	// 게시글 상세 조회
	Map<String,Object> detailCommunity(Long boardNo, String categoryId);

	// 좋아요 확인여부
	Long checkedLike(Map<String, String> likeMap);

	// 삭제하기
	void deleteCommunity(Map<String,Long> deleteMap);
	// 수정하기
	void updateCommunity(WriteFormDTO writeForm);

	// 댓글 작성
	void insertCommunityComment(CommentDTO comment);
	// 댓글 목록 조회
	List<CommentDTO> findCommunityCommentList(Long boardNo);

	Long commentCount(Long boardNo);
	
	// 댓글 수정하기
	void updateComment(CommentDTO comment);

	// 댓글 삭제하기
	void deleteComment(Map<String,Long> deleteCommentMap);


	

	

	
	
}
