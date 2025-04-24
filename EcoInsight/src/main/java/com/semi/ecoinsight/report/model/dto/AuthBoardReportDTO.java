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
public class AuthBoardReportDTO {
	
	private Long reporter;
	private Long authBoardNo;
	private Long reportCategoryNo;
	private String reportCategoryName;
	private String reportContent;

}
