package com.semi.ecoinsight.token.model.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.auth.util.JwtUtil;
import com.semi.ecoinsight.token.model.dao.TokenMapper;
import com.semi.ecoinsight.token.model.vo.RefreshToken;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final JwtUtil tokenUtil;
    private final TokenMapper tokenMapper;

    /**
     * 토큰 생성 메서드 호출 후 토큰 값을 Map으로 받아서 전달
     */
    @Override
    public Map<String, String> generateToken(String memberId, Long memberNo) {
        
        Map<String, String> tokens = createToken(memberId);

        saveToken(tokens.get("refreshToken"), memberNo);
        
        return tokens;
    }

    /**
     * 
     * @param email
     * @return
     */
    private Map<String, String> createToken(String memberId){
        String accessToken = tokenUtil.getAccessToken(memberId);
        String refreshToken = tokenUtil.getRefreshToken(memberId);

        Map<String, String> tokens = new HashMap();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);

        return tokens;
    }

    /**
     * 리프레쉬 토큰을 mapper를 통해 디비에 전달, 저장
     * @param refreshToken
     * @param memberNo
     */
    private void saveToken(String refreshToken, Long memberNo){
        long expiryMillis = System.currentTimeMillis() + (3600000L * 24 * 3);
        Instant expiryInstant = Instant.ofEpochMilli(expiryMillis);
        LocalDateTime expiryDateTime = expiryInstant.atZone(ZoneId.systemDefault()).toLocalDateTime();
        RefreshToken token = RefreshToken.builder().memberNo(memberNo).refreshToken(refreshToken).expiredDate(expiryDateTime).build();

        tokenMapper.saveToken(token);
    }

    @Override
    public Map<String, String> refreshToken(String refreshToken) {
        RefreshToken token = RefreshToken.builder().refreshToken(refreshToken).build();
        RefreshToken responseToken = tokenMapper.findByToken(token);
        
        if(responseToken == null || token.getExpiredDate().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli() < System.currentTimeMillis()){
            throw new RuntimeException("유효하지 않은 토큰입니다.");   
        }
        String memberId = getIdByToken(refreshToken);
        Long memberNo = responseToken.getMemberNo();
        return generateToken(memberId, memberNo);
    }

    private String getIdByToken(String refreshToken){
        Claims claims = tokenUtil.parseJwt(refreshToken);
        return claims.getSubject();
    }
}
