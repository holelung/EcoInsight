package com.semi.ecoinsight.report.model.vo;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class AuthBoardReport {

	private Long reporter;
	private Long authBoardNo;
	private Long reportCategoryNo;
	private String reportCategoryName;
	private String reportContent;
}
