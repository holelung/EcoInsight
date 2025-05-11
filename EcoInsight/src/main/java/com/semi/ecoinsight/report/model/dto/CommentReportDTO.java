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
public class CommentReportDTO {
	
	private String reportCategoryId;
	private String reportCategoryName;
	private Long reporter;
	private Long commentNo;
	private String commentReportContent;

}
