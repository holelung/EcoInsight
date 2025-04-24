package com.semi.ecoinsight.report.model.service;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.report.model.dao.ReportMapper;
import com.semi.ecoinsight.report.model.dto.AuthBoardReportDTO;
import com.semi.ecoinsight.report.model.dto.AuthCommentReportDTO;
import com.semi.ecoinsight.report.model.dto.CommunityBoardReportDTO;
import com.semi.ecoinsight.report.model.dto.CommunityCommentReportDTO;
import com.semi.ecoinsight.report.model.vo.AuthBoardReport;
import com.semi.ecoinsight.report.model.vo.AuthCommentReport;
import com.semi.ecoinsight.report.model.vo.CommunityBoardReport;
import com.semi.ecoinsight.report.model.vo.CommunityCommentReport;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
	
	private final ReportMapper reportMapper;
	
	@Override
	public void insertCommunityBoardReport(CommunityBoardReportDTO cbr) {
		
		CommunityBoardReport requestData = CommunityBoardReport.builder()
				.communityBoardNo(cbr.getCommunityBoardNo())
				.reporter(cbr.getReporter())
				.reportCategoryNo(cbr.getReportCategoryNo())
				.reportContent(cbr.getReportContent())
				.build();
		
		reportMapper.insertCommunityBoardReport(requestData);
		
	}

	@Override
	public void insertAuthBoardReport(AuthBoardReportDTO abr) {
		
		AuthBoardReport requestData = AuthBoardReport.builder()
				.reporter(abr.getReporter())
				.authBoardNo(abr.getAuthBoardNo())
				.reportCategoryNo(abr.getReportCategoryNo())
				.reportContent(abr.getReportContent())
				.build();
		
		reportMapper.insertAuthBoardReport(requestData);
		
	}

	@Override
	public void insertCommunityCommentReport(CommunityCommentReportDTO ccr) {
		
		CommunityCommentReport requestData = CommunityCommentReport.builder()
				.reporter(ccr.getReporter())
				.reportCategoryNo(ccr.getReportCategoryNo())
				.cmtReportContent(ccr.getCmtReportContent())
				.build();
		
		reportMapper.insertCommunityCommentReport(requestData);
	}

	@Override
	public void insertAuthCommentReport(AuthCommentReportDTO acr) {
		
		AuthCommentReport requestData = AuthCommentReport.builder()
				.reporter(acr.getReporter())
				.reportCategoryNo(acr.getReportCategoryNo())
				.cmtReportContent(acr.getCmtReportContent())
				.build();
		
		reportMapper.insertAuthCommentReport(requestData);
	}
}
