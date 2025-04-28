package com.semi.ecoinsight.mypage.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.mypage.model.dto.EditProfileDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPageDTO;

@Mapper
public interface MyPageMapper {
    // 내 정보 조회
    MyPageDTO selectMemberInfo(Long memberNo);

    // 내가 쓴 게시글 목록 조회
    // List<PostDTO> selectMyPosts(int memberNo);

    // 내 정보 수정
    void editMyProfile(EditProfileDTO dto);
    

    // 회원 탈퇴 (활성화 플래그 변경)
    int withdrawalMember(Long memberNo);
}

