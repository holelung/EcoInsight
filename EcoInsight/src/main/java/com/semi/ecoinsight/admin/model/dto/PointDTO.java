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
public class PointDTO {
    private Long pointNo;
    private Long memberNo;
    private Long changePoint;
    private Date createdDate;
}
