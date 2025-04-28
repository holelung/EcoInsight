package com.semi.ecoinsight.mypage.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class EditProfileDTO {
	private Long memberNo;
	private String memberPw;
	private String memberId;
	private String memberName;
	private String memberPh;
	private String email;
	
	
}
