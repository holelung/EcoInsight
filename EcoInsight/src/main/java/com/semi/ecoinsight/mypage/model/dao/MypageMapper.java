package com.semi.ecoinsight.mypage.model.dao;

import java.util.Map;

import com.semi.ecoinsight.mypage.model.dto.MypageDTO;

public interface MypageMapper {
    // 내 정보 조회
    MypageDTO selectMemberInfo(int memberNo);

    // 내가 쓴 게시글 목록 조회
    // List<PostDTO> selectMyPosts(int memberNo);

    // 내 정보 수정
    // int editMyProfile(EditProfileDTO dto);
    
    void updatePassword(Map<String, Object> passwordEntity);

    // 회원 탈퇴 (활성화 플래그 변경)
    // int withdrawalMember(int memberNo);
}

