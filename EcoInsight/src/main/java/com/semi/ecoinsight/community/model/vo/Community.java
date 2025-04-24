package com.semi.ecoinsight.community.model.vo;

import java.sql.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder
public class Community {
	private Long cBoardNo;
	private Long memberNo;
	private String categoryId;
	private String cBoardTitle;
	private String cBoardWriter;
	private String cBoardContent;
	private Date createDate;
	private Date modifiedDate;
	private Long viewCount;
	private String isDeleted;

}
