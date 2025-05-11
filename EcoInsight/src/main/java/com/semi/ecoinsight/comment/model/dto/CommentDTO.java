package com.semi.ecoinsight.comment.model.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CommentDTO {
	private Long commentNo;
	private Long boardNo;
	private Long memberNo;
	private String commentContent;
	private Long parentCommentNo;
	private Date createdDate;
  private Date modifiedDate;
  private String isDeleted;
	

}
