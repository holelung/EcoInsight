package com.semi.ecoinsight.report.model.dto;

import lombok.Data;

@Data
public class ReportSummaryDTO {
    private Long reportNo;
    private String reportCategoryId;
    private Long reporter;
    private Long boardNo;
    private Long commentNo;
    private String reportContent;
    private String reportType;
    private String isDeleted;
}