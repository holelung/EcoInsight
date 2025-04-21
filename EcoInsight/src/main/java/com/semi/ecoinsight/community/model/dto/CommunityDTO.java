package com.semi.ecoinsight.community.model.dto;

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
public class CommunityDTO {
	private Long cBoardNo;
	private Long memberNo;
	private String categoryId;
	private String cBoardTitle;
	private String cBoardContent;
	private Date createDate;
	private Date modifiedDate;
	private int viewCount;
	private String isDeleted;

}
