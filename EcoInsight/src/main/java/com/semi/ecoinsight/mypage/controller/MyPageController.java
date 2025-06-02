package com.semi.ecoinsight.mypage.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.mypage.model.dto.ChangePasswordDTO;
import com.semi.ecoinsight.mypage.model.dto.EditProfileDTO;
import com.semi.ecoinsight.mypage.model.dto.MyAuthPostsDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPageDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPostsDTO;
import com.semi.ecoinsight.mypage.model.dto.WithdrawalDTO;
import com.semi.ecoinsight.mypage.model.service.MyPageService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/mypage")
@Slf4j
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;


    @GetMapping
    public ResponseEntity<MyPageDTO> selectMyPageInfo() {
        MyPageDTO dto = myPageService.selectMyPageInfo();
        return ResponseEntity.ok(dto);
    }


    @PutMapping("/changepassword")
    public ResponseEntity<Void> changePassword(
            @Valid @RequestBody ChangePasswordDTO dto
    ) {
        myPageService.changePassword(dto);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/myposts")
    public ResponseEntity<List<MyPostsDTO>> getMyPosts() {
        List<MyPostsDTO> list = myPageService.selectMyPosts();
        return ResponseEntity.ok(list);
    }

    /**
     * 프로필 수정 폼 초기 데이터 조회
     */
    @GetMapping("/editprofile")
    public ResponseEntity<EditProfileDTO> getEditProfile() {
        EditProfileDTO dto = myPageService.getEditProfileInfo();
        return ResponseEntity.ok(dto);
    }

    /**
     * 프로필 수정 처리
     */
    @PutMapping("/editprofile")
    public ResponseEntity<Void> editProfile(
            @Valid @RequestBody EditProfileDTO dto
    ) {
        myPageService.editProfile(dto);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/withdrawal")
    public ResponseEntity<Void> withdraw(
            @Valid @RequestBody WithdrawalDTO dto
    ) {
        myPageService.withdrawal(dto.getCurrentPassword());
        return ResponseEntity.noContent().build();
    }
    
    
    // 인증게시판 글 조회
    @GetMapping("/myauthposts")
    public ResponseEntity<List<MyAuthPostsDTO>> getMyAuthPosts() {
        List<MyAuthPostsDTO> list = myPageService.selectMyAuthPosts();
        return ResponseEntity.ok(list);
    }
    
    
}
