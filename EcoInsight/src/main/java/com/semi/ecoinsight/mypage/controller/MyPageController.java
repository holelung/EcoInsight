package com.semi.ecoinsight.mypage.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.auth.controller.AuthController;
import com.semi.ecoinsight.auth.model.service.AuthService;
import com.semi.ecoinsight.mypage.model.dto.MyPageDTO;
import com.semi.ecoinsight.mypage.model.service.MyPageService;
import com.semi.ecoinsight.token.model.service.TokenService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("mypages")
@RequiredArgsConstructor
public class MyPageController {
	
	private final MyPageService myPageService;
	
	@PostMapping
	public ResponseEntity<MyPageDTO> selectMyPageInfo(){
		myPageService.selectMyPageInfo();
		return null;
	}
	
	
}
