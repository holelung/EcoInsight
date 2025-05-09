package com.semi.ecoinsight.mypage.model.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.Value;

@Value
@Getter
@Setter
public class MyPage {
	
	private Long memberNo;
	private String memberId;
	private String memberPw;
	private String memberName;
	private String email;
	private String grade;
	private Long point;
	private String memberPh;
	private Date enrollDate;
	
	
}
