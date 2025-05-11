package com.semi.ecoinsight.admin.model.dto;

import java.sql.Date;

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
public class BanDTO {
    private Long banNo;
    private Long memberNo;
    private String banId;
    private Long banPeriod;
    private Date banStartDate;
    private Date banEndDate;
    
    private String memberId;
    private String memberName;
    private String email;
    private String memberPh;
    private Date memberEnrollDate;
    private Date memberUpdateDate;
    private String isActive;
}
