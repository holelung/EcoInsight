package com.semi.ecoinsight.community.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.community.model.service.CommunityService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequestMapping("/communities")
@RestController
@RequiredArgsConstructor
public class CommunityController {
	
	private final CommunityService communityService;
	
	@PostMapping("/community-write")
	public ResponseEntity<?> communityWrite(@RequestBody @Valid WriteFormDTO writeForm){
		communityService.insertCommunityBoard(writeForm);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
}
