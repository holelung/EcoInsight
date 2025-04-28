package com.semi.ecoinsight.comment.model.vo;

import java.sql.Date;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Comment {
	private Long commentNo;
	private Long boardNo;
	private Long memberNo;
	private String commentContent;
	private Long parentCommentNo;
	private Date createdDate;
    private Date modifiedDate;
    private String isDeleted;
}
