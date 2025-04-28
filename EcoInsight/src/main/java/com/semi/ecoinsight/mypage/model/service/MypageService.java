package com.semi.ecoinsight.mypage.model.service;

import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.mypage.model.dto.EditProfileDTO;

public interface MypageService {
	
	// 마이페이지 유저정보 출력
	void myPage(MemberDTO member);
	
	// 개인정보 수정
	void editProfile(EditProfileDTO member);
    
    // 회원탈퇴 
    void withdrawal(EditProfileDTO member);
}
