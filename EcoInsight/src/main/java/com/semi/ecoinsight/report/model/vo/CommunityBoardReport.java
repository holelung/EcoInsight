package com.semi.ecoinsight.report.model.vo;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class CommunityBoardReport {

	private Long communityBoardNo;
	private Long reporter;
	private String reportCategoryNo;
	private String reportCategoryName;
	private String reportContent;
}
