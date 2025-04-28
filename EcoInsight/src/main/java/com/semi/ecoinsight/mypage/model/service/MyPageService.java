package com.semi.ecoinsight.mypage.model.service;

import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.mypage.model.dto.EditProfileDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPageDTO;

public interface MyPageService {
	
	// 마이페이지 유저정보 출력
	MyPageDTO selectMyPageInfo();
	
	// 개인정보 수정
	void editProfile(EditProfileDTO member);
    
    // 회원탈퇴 
    void withdrawal(String memberPw);
}
