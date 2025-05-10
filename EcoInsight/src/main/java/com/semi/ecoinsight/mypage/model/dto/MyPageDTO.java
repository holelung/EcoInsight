package com.semi.ecoinsight.mypage.model.dto;



import java.util.Date;

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
public class MyPageDTO {
	
	private String memberName;
	private String memberId;
	private String grade;
	private Date enrollDate;
	private Long point;
	
	
	
}
