package com.semi.ecoinsight.mypage.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.semi.ecoinsight.mypage.model.dto.ChangePasswordDTO;
import com.semi.ecoinsight.mypage.model.dto.EditProfileDTO;
import com.semi.ecoinsight.mypage.model.dto.MyAuthPostsDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPageDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPostsDTO;

@Mapper
public interface MyPageMapper {
    // 내 정보 조회
    MyPageDTO selectMemberInfo(Long memberNo);
    // 비밀번호 변경 
    void changePassword(ChangePasswordDTO dto);
    void updatePasswordByMemberId(
            @Param("memberId") String memberId,
            @Param("newPassword") String newPassword
        );
    // 내 정보 수정
    void editMyProfile(EditProfileDTO dto);
    
    // 회원 탈퇴 (활성화 플래그 변경)
    int withdrawalMember(Long memberNo);

    // 커뮤니티 게시글 조회
    List<MyPostsDTO> selectMyPosts(Long memberNo);
    
	EditProfileDTO getMemberByMemberNo(Long memberNo);
	
	//인증게시판 조회
	List<MyAuthPostsDTO> selectMyAuthPosts(Long memberNo);

}

 