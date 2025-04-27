package com.semi.ecoinsight.report.model.vo;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class BoardReport {

	private Long boardNo;
	private Long reporter;
	private String reportCategoryId;
	private String reportCategoryName;
	private String reportContent;
}
