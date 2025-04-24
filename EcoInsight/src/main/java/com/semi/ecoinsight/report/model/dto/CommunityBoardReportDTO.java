package com.semi.ecoinsight.report.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CommunityBoardReportDTO {
	
	private Long communityBoardNo;
	private Long reporter;
	private String reportCategoryNo;
	private String reportCategoryName;
	private String reportContent;

}
