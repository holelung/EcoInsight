package com.semi.ecoinsight.token.model.service;

import com.semi.ecoinsight.token.model.vo.Tokens;

public interface TokenService {

    // 토큰 생성
    Tokens generateToken(String memberId, Long memberNo);

    Tokens refreshToken(String refreshToken);
}
