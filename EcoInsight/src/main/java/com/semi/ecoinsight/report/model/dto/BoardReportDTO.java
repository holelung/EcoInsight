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
public class BoardReportDTO {
	
	private Long boardNo;
	private Long reporter;
	private String reportCategoryId;
	private String reportCategoryName;
	private String reportContent;

}
