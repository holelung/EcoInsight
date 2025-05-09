package com.semi.ecoinsight.report.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.report.model.dto.ReportSummaryDTO;
import com.semi.ecoinsight.report.model.vo.BoardReport;
import com.semi.ecoinsight.report.model.vo.CommentReport;

@Mapper
public interface ReportMapper {
	
    void insertCommunityBoardReport(BoardReport boardReport);
    void insertAuthBoardReport(BoardReport boardReport);
    void insertCommunityCommentReport(CommentReport commentReport);
    void insertAuthCommentReport(CommentReport commentReport);
    List<ReportSummaryDTO> findAllReports();
	
}
