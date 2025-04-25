package com.semi.ecoinsight.auth.model.vo;

import java.util.Date;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class VerifyCodeEmail {
    private Long verifyCodeNo;
    private String email;
    private String verifyCode;
    private Date createDate;
}
