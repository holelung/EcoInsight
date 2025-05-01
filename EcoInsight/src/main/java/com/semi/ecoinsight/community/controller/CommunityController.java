package com.semi.ecoinsight.community.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
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
	
	@GetMapping
	public ResponseEntity<List<BoardDTO>> findAllCommunity(@RequestParam(name="page", defaultValue = "0") int page,
														   @RequestParam(name="search", required = false ) String search,
														   @RequestParam(name="categoryId") String categoryId){		
		communityService.findAllCommunity(page, search, categoryId);
		return ResponseEntity.ok(communityService.findAllCommunity(page, search, categoryId));
	}
}
