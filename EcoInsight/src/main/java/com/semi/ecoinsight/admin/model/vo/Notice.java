package com.semi.ecoinsight.admin.model.vo;

import java.sql.Date;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Notice {
    private Long noticeNo;
    private String noticeTypeNo;
    private Long memberNo;
    private String noticeTitle;
    private String noticeContent;
    private Date createdDate;
    private Date modifiedDate;
    private String status;
    private Long viewCount;
}
