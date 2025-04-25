package com.semi.ecoinsight.auth.model.service;

import java.util.Map;

import com.semi.ecoinsight.auth.model.vo.CustomUserDetails;
import com.semi.ecoinsight.member.model.dto.MemberDTO;

public interface AuthService {
    Map<String, Object> login(MemberDTO member);
    Map<String, String> sendCodeEmail(String email);
    String verifyCodeEmail(Map<String, String> verifyInfo);

    CustomUserDetails getUserDetails();

    boolean isAdmin();
}
