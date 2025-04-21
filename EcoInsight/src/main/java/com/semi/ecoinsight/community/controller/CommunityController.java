package com.semi.ecoinsight.community.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequestMapping("/communities")
@RestController
@RequiredArgsConstructor
@Validated
public class CommunityController {
	
	@PostMapping
	public ResponseEntity<?> zzzz(){
		return null;
	}
}
