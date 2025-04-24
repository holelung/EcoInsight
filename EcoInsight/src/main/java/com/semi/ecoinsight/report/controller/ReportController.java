package com.semi.ecoinsight.report.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.report.model.dto.AuthBoardReportDTO;
import com.semi.ecoinsight.report.model.dto.AuthCommentReportDTO;
import com.semi.ecoinsight.report.model.dto.CommunityBoardReportDTO;
import com.semi.ecoinsight.report.model.dto.CommunityCommentReportDTO;
import com.semi.ecoinsight.report.model.service.ReportService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/reports")
@Slf4j
public class ReportController {
	
	private final ReportService reportService;
	
	@PostMapping("/community-board")
	public ResponseEntity<?> insertCommunityBoardReport(@RequestBody CommunityBoardReportDTO cbr){
		log.info("{}",cbr);
		reportService.insertCommunityBoardReport(cbr);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@PostMapping("/auth-board")
	public ResponseEntity<?> insertAuthBoardReport(@RequestBody AuthBoardReportDTO abr){
		
		reportService.insertAuthBoardReport(abr);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@PostMapping("/community-comment")
	public ResponseEntity<?> insertCommunityCommentReport(@RequestBody CommunityCommentReportDTO ccr) {
		
		reportService.insertCommunityCommentReport(ccr);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@PostMapping("auth-comment")
	public ResponseEntity<?> insertAuthCommentReport(@RequestBody AuthCommentReportDTO acr) {
		
		reportService.insertAuthCommentReport(acr);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	
	

}
