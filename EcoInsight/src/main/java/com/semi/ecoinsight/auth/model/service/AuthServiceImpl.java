package com.semi.ecoinsight.auth.model.service;

import java.util.Map;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.semi.ecoinsight.auth.model.vo.CustomUserDetails;
import com.semi.ecoinsight.exception.util.CustomAuthenticationException;
import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.token.model.service.TokenService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    @Override
    public Map<String, String> login(MemberDTO member) {
        Authentication authentication = null;
        try{
            authentication=
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    member.getMemberId(),
                    member.getMemberPw()));
        } catch(AuthenticationException e){
            throw new CustomAuthenticationException("아이디 또는 비밀번호가 잘못되었습니다.");
        }
        CustomUserDetails loginMember = (CustomUserDetails)authentication.getPrincipal();

        Map<String, String> loginResponse = tokenService.generateToken(loginMember.getUsername(), loginMember.getMemberNo());

        loginResponse.put("memberNo", String.valueOf(loginMember.getMemberNo()));
        loginResponse.put("username", loginMember.getUsername());
        loginResponse.put("email", loginMember.getEmail());
        loginResponse.put("memberName", loginMember.getMemberName());
        loginResponse.put("memberRole", loginMember.getMemberRole());
        return loginResponse;
    }

}
