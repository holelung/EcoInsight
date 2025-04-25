package com.semi.ecoinsight.report.model.vo;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class CommentReport {

	private String reportCategoryId;
	private String reportCategoryName;
	private Long reporter;
	private Long commentNo;
	private String commentReportContent;
}
