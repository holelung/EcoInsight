package com.semi.ecoinsight.report.model.service;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.report.model.dao.ReportMapper;
import com.semi.ecoinsight.report.model.dto.BoardReportDTO;
import com.semi.ecoinsight.report.model.dto.CommentReportDTO;
import com.semi.ecoinsight.report.model.vo.BoardReport;
import com.semi.ecoinsight.report.model.vo.CommentReport;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
	
	private final ReportMapper reportMapper;
	
	@Override
	public void insertCommunityBoardReport(BoardReportDTO boardReport) {
		
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
		
		BoardReport requestData = BoardReport.builder()
				.reporter(boardReport.getReporter())
				.boardNo(boardReport.getBoardNo())
				.reportCategoryId(boardReport.getReportCategoryId())
				.reportContent(boardReport.getReportContent())
				.build();
		
		reportMapper.insertAuthBoardReport(requestData);
		
	}

	@Override
	public void insertCommunityCommentReport(CommentReportDTO commentReport) {
		
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
		
		CommentReport requestData = CommentReport.builder()
				.reporter(commentReport.getReporter())
				.reportCategoryId(commentReport.getReportCategoryId())
				.commentNo(commentReport.getCommentNo())
				.commentReportContent(commentReport.getCommentReportContent())
				.build();
		
		reportMapper.insertAuthCommentReport(requestData);
	}
}
