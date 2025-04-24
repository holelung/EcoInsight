package com.semi.ecoinsight.report.model.vo;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class AuthCommentReport {
	
	private String reportCategoryNo;
	private String reportCategoryName;
	private Long reporter;
	private String cmtReportContent;
}
