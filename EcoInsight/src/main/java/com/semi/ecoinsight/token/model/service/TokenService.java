package com.semi.ecoinsight.token.model.service;

import java.util.Map;

public interface TokenService {

    // 토큰 생성
    Map<String, String> generateToken(String memberId, Long memberNo);

    Map<String, String> refreshToken(String refreshToken);
}
