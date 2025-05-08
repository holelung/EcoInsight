package com.semi.ecoinsight.auth.model.service;

import java.util.Map;


import com.semi.ecoinsight.auth.model.vo.CustomUserDetails;
import com.semi.ecoinsight.member.model.dto.MemberDTO;

public interface AuthService {
    Map<String, Object> login(MemberDTO member);
    Map<String, Object> adminLogin(MemberDTO member);
    void sighUpEmailCode(Map<String, String> email);
    void findIdEmailCode(Map<String, String> email);
    String findPasswordEmailCode(Map<String, String> email);
    void changeEmailCode(Map<String, String> email);
    void findPasswordEmailVerifyCodeSend(Map<String, String> verifyInfo);
    String checkVerifyCode(Map<String, String> verifyInfo);
    CustomUserDetails getUserDetails();
    boolean isAdmin();
    Map<String, Object> googleLogin(Map<String, String> body);


}
