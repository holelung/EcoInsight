package com.semi.ecoinsight.authboard.model.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthBoardDTO {
	private Long boardNo;
	private Long memberNo; 
	private Long categoryId;
	private String boardTitle;
	private String boardContent;
	private Date createDate;
	private Date modifiedDate;
	private Long viewCount;
	private String isDeleted; 
}
