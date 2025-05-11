package com.semi.ecoinsight.report.model.service;

import java.util.List;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.semi.ecoinsight.exception.util.CustomMessagingException;
import com.semi.ecoinsight.report.model.dao.ReportMapper;
import com.semi.ecoinsight.report.model.dto.BoardReportDTO;
import com.semi.ecoinsight.report.model.dto.CommentReportDTO;
import com.semi.ecoinsight.report.model.dto.ReportSummaryDTO;
import com.semi.ecoinsight.report.model.vo.BoardReport;
import com.semi.ecoinsight.report.model.vo.CommentReport;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
	
	private final ReportMapper reportMapper;
	
	private void checkLogin() {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    if (authentication == null ||
	        !authentication.isAuthenticated() ||
	        authentication instanceof AnonymousAuthenticationToken) {
	        throw new CustomMessagingException("로그인부터 해주세요.");
	    }
	}
	
	@Override
	public void insertCommunityBoardReport(BoardReportDTO boardReport) {
	    checkLogin();

	    BoardReport requestData = BoardReport.builder()
	        .boardNo(boardReport.getBoardNo())
	        .reporter(boardReport.getReporter())
	        .reportCategoryId(boardReport.getReportCategoryId())
	        .reportContent(boardReport.getReportContent())
	        .build();

	    reportMapper.insertCommunityBoardReport(requestData);
	}

	@Override
	public void insertAuthBoardReport(BoardReportDTO boardReport) {
	    checkLogin();

	    BoardReport requestData = BoardReport.builder()
	        .boardNo(boardReport.getBoardNo())
	        .reporter(boardReport.getReporter())
	        .reportCategoryId(boardReport.getReportCategoryId())
	        .reportContent(boardReport.getReportContent())
	        .build();

	    reportMapper.insertAuthBoardReport(requestData);
	}

	@Override
	public void insertCommunityCommentReport(CommentReportDTO commentReport) {
	    checkLogin();

	    CommentReport requestData = CommentReport.builder()
	        .reporter(commentReport.getReporter())
	        .reportCategoryId(commentReport.getReportCategoryId())
	        .commentNo(commentReport.getCommentNo())
	        .commentReportContent(commentReport.getCommentReportContent())
	        .build();

	    reportMapper.insertCommunityCommentReport(requestData);
	}

	@Override
	public void insertAuthCommentReport(CommentReportDTO commentReport) {
	    checkLogin();

	    CommentReport requestData = CommentReport.builder()
	        .reporter(commentReport.getReporter())
	        .reportCategoryId(commentReport.getReportCategoryId())
	        .commentNo(commentReport.getCommentNo())
	        .commentReportContent(commentReport.getCommentReportContent())
	        .build();

	    reportMapper.insertAuthCommentReport(requestData);
	}
	
	@Override
	public List<ReportSummaryDTO> getAllReports() {
		return reportMapper.findAllReports();
	}
}
