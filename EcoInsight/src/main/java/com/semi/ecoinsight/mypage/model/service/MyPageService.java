package com.semi.ecoinsight.mypage.model.service;

import java.util.List;

import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.mypage.model.dto.ChangePasswordDTO;
import com.semi.ecoinsight.mypage.model.dto.EditProfileDTO;
import com.semi.ecoinsight.mypage.model.dto.MyAuthPostsDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPageDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPostsDTO;

public interface MyPageService {
	
	// 마이페이지 유저정보 출력
	MyPageDTO selectMyPageInfo();
	
	// 개인정보 수정
	EditProfileDTO getEditProfileInfo();
    void editProfile(EditProfileDTO dto);
    
    // 회원탈퇴
    void withdrawal(String currentPassword);
    
    // 비밀번호 변경
    void changePassword(ChangePasswordDTO dto);
    
    // 커뮤니티 게시글 조회
    List<MyPostsDTO> selectMyPosts();
    
    // 인증게시판 조회
    List<MyAuthPostsDTO> selectMyAuthPosts();
    
}
