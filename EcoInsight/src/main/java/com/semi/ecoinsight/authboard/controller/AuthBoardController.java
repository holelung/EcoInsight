package com.semi.ecoinsight.authboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.authboard.model.service.AuthBoardService;

import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequestMapping("/authboards")
@RequiredArgsConstructor
public class AuthBoardController {
	private final AuthBoardService authBoardService = null;
	
	@PostMapping
	public ResponseEntity<?> abc(){
		return null;
	}
}
