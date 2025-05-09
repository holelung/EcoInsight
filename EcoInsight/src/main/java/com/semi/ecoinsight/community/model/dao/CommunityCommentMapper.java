package com.semi.ecoinsight.community.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.comment.model.dto.CommentDTO;

@Mapper
public interface CommunityCommentMapper {

	// 댓글 쓰기
	void insertCommunityComment(CommentDTO comment);
	
	// 댓글 목록
	List<CommentDTO> findCommunityCommentList(Long boardNo);
	
	// 댓글 조회(카운트보이기)
	Long commentCount(Long boardNo);

	void updateComment(CommentDTO comment);

	Long deleteComment(Map<String,Long> deleteCommentMap);
}
