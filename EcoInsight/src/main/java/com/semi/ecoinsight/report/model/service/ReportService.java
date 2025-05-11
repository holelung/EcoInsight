package com.semi.ecoinsight.report.model.service;

import java.util.List;

import com.semi.ecoinsight.report.model.dto.BoardReportDTO;
import com.semi.ecoinsight.report.model.dto.CommentReportDTO;
import com.semi.ecoinsight.report.model.dto.ReportSummaryDTO;

public interface ReportService {

    void insertCommunityBoardReport(BoardReportDTO boardReport);
    void insertAuthBoardReport(BoardReportDTO boardReport);
    void insertCommunityCommentReport(CommentReportDTO commentReport);
    void insertAuthCommentReport(CommentReportDTO commentReport);
    List<ReportSummaryDTO> getAllReports();
}
