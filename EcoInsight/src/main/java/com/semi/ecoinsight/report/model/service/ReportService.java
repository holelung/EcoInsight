package com.semi.ecoinsight.report.model.service;

import com.semi.ecoinsight.report.model.dto.AuthBoardReportDTO;
import com.semi.ecoinsight.report.model.dto.AuthCommentReportDTO;
import com.semi.ecoinsight.report.model.dto.CommunityBoardReportDTO;
import com.semi.ecoinsight.report.model.dto.CommunityCommentReportDTO;

public interface ReportService {

    void insertCommunityBoardReport(CommunityBoardReportDTO cbr);
    void insertAuthBoardReport(AuthBoardReportDTO abr);
    void insertCommunityCommentReport(CommunityCommentReportDTO ccr);
    void insertAuthCommentReport(AuthCommentReportDTO acr);
}
