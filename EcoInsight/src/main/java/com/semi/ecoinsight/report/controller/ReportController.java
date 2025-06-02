package com.semi.ecoinsight.report.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.report.model.dto.BoardReportDTO;
import com.semi.ecoinsight.report.model.dto.CommentReportDTO;
import com.semi.ecoinsight.report.model.dto.ReportSummaryDTO;
import com.semi.ecoinsight.report.model.service.ReportService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/api/reports")
@Slf4j
public class ReportController  {
	
	private final ReportService reportService;
	
	@PostMapping("/community-board")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> insertCommunityBoardReport(@RequestBody BoardReportDTO dto){
		reportService.insertCommunityBoardReport(dto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@PostMapping("/auth-board")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> insertAuthBoardReport(@RequestBody BoardReportDTO dto){
		reportService.insertAuthBoardReport(dto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@PostMapping("/community-comment")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> insertCommunityCommentReport(@RequestBody CommentReportDTO dto) {
		reportService.insertCommunityCommentReport(dto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@PostMapping("auth-comment")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> insertAuthCommentReport(@RequestBody CommentReportDTO dto) {
		reportService.insertAuthCommentReport(dto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@GetMapping("/all")
	// @PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<ReportSummaryDTO>> getAllReports() {
	    List<ReportSummaryDTO> reports = reportService.getAllReports();
	    return ResponseEntity.ok(reports);
	}
}
