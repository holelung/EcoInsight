package com.semi.ecoinsight.admin.model.dto;

import java.sql.Date;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NoticeDTO {
    
    private Long noticeNo;
    private Long noticeTypeNo;
    private Long memberNo;
    private String noticeTitle;
    private String noticeContent;
    private Date createdDate;
    private Date modifiedDate;
    private String status;
    private Long viewCount;
}
