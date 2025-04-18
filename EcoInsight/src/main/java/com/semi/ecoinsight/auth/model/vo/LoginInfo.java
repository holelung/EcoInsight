package com.semi.ecoinsight.auth.model.vo;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoginInfo {
    private String memberNo;
    private String username;
    private String email;
    private String memberName;
    private String memberRole;
    private char isActive;
}
