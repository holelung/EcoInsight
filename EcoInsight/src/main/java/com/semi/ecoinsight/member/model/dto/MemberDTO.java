package com.semi.ecoinsight.member.model.dto;

import java.util.Date;

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
public class MemberDTO {
    private Long memberNo;
    private String memberId;
    private String memberPw;
    private String memberName;
    private String email;
    private String memberPh;
    private String memberRole;
    private String gradeNo;
    private Date memberEnrollDate;
    private Date memberUpdateDate;
    private char isActive;
};
