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
    private String banType;
    private Long banPeriod;
    private Date banStartDate;
    private Date banEndDate;
}
