package com.semi.ecoinsight.mypage.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.mypage.model.dto.EditProfileDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPageDTO;
import com.semi.ecoinsight.mypage.model.service.MyPageService;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("mypages")
@RequiredArgsConstructor
public class MyPageController {
	
	private final MyPageService myPageService;
	
	@GetMapping
	public ResponseEntity<MyPageDTO> selectMyPageInfo(){
		myPageService.selectMyPageInfo();
		return null;
	}
	
//	@PostMapping
//	public ResponseEntity<EditProfileDTO>editProfile(){
//		myPageService.editProfile(EditProfileDTO member);
//		return null;
//	}
//	
//	@PostMapping
//	public ResponseEntity<EditProfileDTO>withdrawal(){
//		myPageService.withdrawal(String memberPw);
//		return null;
//	}
//	
	
}
