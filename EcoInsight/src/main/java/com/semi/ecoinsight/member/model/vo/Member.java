package com.semi.ecoinsight.member.model.vo;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder
public class Member {
    private Long memberNo;
    private String memberId;
    private String memberPw;
    private String memberName;
    private String email;
    private String memberPh;
    private Date memberEnrollDate;
    private String memberRole;
    private String gradeNo;
    private char isActive;
    private Date memberUpdateDate;
}
