package com.semi.ecoinsight.configuration.util;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;
    private SecretKey key;

    @PostConstruct
    public void init(){
        byte[] keyArr = Base64.getDecoder().decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyArr);
    }

    public String getAccessToken(String memberId){
        return Jwts.builder()
                   .subject(memberId)
                   .issuedAt(new Date())
                   .expiration(new Date(System.currentTimeMillis() + (3600000L*24)))
                   .signWith(key)
                   .compact();
    }

    public String getRefreshToken(String memberId){
        return Jwts.builder()
                   .subject(memberId) // 사용자이름
                   .issuedAt(new Date()) // 발급일
                   .expiration(new Date(System.currentTimeMillis() + (3600000L*24*3))) // 만료일
                   .signWith(key) // 서명
                   .compact();
    }

    public Claims parseJwt(String token){
        return Jwts.parser()
                   .verifyWith(key)
                   .build()
                   .parseSignedClaims(token)
                   .getPayload();
    }
}
