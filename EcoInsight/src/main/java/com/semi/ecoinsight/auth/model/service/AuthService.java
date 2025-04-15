package com.semi.ecoinsight.auth.model.service;

import java.util.Map;

import com.semi.ecoinsight.member.model.dto.MemberDTO;

public interface AuthService {
    Map<String, String> login(MemberDTO member);
}
