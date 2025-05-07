package com.semi.ecoinsight.mypage.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.mypage.model.dto.ChangePasswordDTO;
import com.semi.ecoinsight.mypage.model.dto.EditProfileDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPageDTO;
import com.semi.ecoinsight.mypage.model.dto.WithdrawalDTO;
import com.semi.ecoinsight.mypage.model.service.MyPageService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("mypage")
@RequiredArgsConstructor
public class MyPageController {
	
	private final MyPageService myPageService;
	
	@GetMapping
	public ResponseEntity<MyPageDTO> selectMyPageInfo(){
		MyPageDTO dto = myPageService.selectMyPageInfo();
		return ResponseEntity.ok(dto);
	}
	
	@PutMapping("/password")
    public ResponseEntity<Void> changePassword(
        @RequestBody ChangePasswordDTO dto) {
        myPageService.changePassword(dto);
        return ResponseEntity.noContent().build();
    }
	
//	@PostMapping
//	public ResponseEntity<EditProfileDTO>editProfile(){
//		myPageService.editProfile(EditProfileDTO member);
//		return null;
//	}
	
    @PostMapping("/withdrawal")
    public ResponseEntity<Void> withdraw(
        @Valid @RequestBody WithdrawalDTO dto) {
        myPageService.withdrawal(dto.getCurrentPassword());
        return ResponseEntity.noContent().build();
    }
	
}
