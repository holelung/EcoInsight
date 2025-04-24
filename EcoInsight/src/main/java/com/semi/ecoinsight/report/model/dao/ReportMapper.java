package com.semi.ecoinsight.report.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.report.model.vo.AuthBoardReport;
import com.semi.ecoinsight.report.model.vo.AuthCommentReport;
import com.semi.ecoinsight.report.model.vo.CommunityBoardReport;
import com.semi.ecoinsight.report.model.vo.CommunityCommentReport;


@Mapper
public interface ReportMapper {
	
    void insertCommunityBoardReport(CommunityBoardReport cbr);
    void insertAuthBoardReport(AuthBoardReport abr);
    void insertCommunityCommentReport(CommunityCommentReport ccr);
    void insertAuthCommentReport(AuthCommentReport acr);
	
}
