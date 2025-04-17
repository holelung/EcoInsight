package com.semi.ecoinsight.auth.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.semi.ecoinsight.auth.model.vo.CustomUserDetails;
import com.semi.ecoinsight.auth.model.vo.LoginInfo;
import com.semi.ecoinsight.exception.util.CustomAuthenticationException;
import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.token.model.service.TokenService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final JavaMailSender sender;
    @Override
    public Map<String, Object> login(MemberDTO member) {
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

        Map<String, Object> loginResponse = new HashMap<String, Object>();
        loginResponse.put("tokens",tokenService.generateToken(loginMember.getUsername(), loginMember.getMemberNo()));
        LoginInfo loginInfo = LoginInfo.builder()
                                       .memberNo(String.valueOf(loginMember.getMemberNo()))
                                       .username(loginMember.getUsername())
                                       .email(loginMember.getEmail())
                                       .memberName(loginMember.getMemberName())
                                       .memberRole(loginMember.getMemberRole())
                                       .isActive(loginMember.getIsActive())
                                       .build();

        loginResponse.put("loginInfo",loginInfo);
        log.info("loginResponse = {}", loginResponse);
        return loginResponse;
    }
    @Override
    public Map<String, String> sendCodeEmail(String email) {
        int verifyCode = verifyCodeCreate();
        MimeMessage message = sender.createMimeMessage();
        try{
            MimeMessageHelper helper = new MimeMessageHelper(message,false, "UTF-8");
            helper.setTo(email);
            helper.setSubject("Eco-Insight 이메일 인증 번호입니다.");
            helper.setText(
                """
            <div style="width:100%; background:#f4f4f4; padding:20px; font-family:Arial,sans-serif;">
              <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden;">
                <div style="background:#4CAF50; color:#fff; padding:20px; text-align:center;">
                  <h1>Eco-Insight 이메일 인증</h1>
                </div>
                <div style="padding:20px; color:#333;">
                  <p>안녕하세요,</p>
                  <p>아래 인증 코드를 입력하여 이메일 인증을 완료해주세요.</p>
                  <div style="text-align:center; margin:20px 0;">
                    <span style="display:inline-block; font-size:24px; font-weight:bold; color:#4CAF50;
                                 padding:10px 20px; border:2px dashed #4CAF50; border-radius:4px;">
                      """ + verifyCode + """
                    </span>
                  </div>
                  <p>인증 코드는 <strong>3분</strong> 동안 유효합니다.</p>
                  <p>감사합니다.</p>
                </div>
              </div>
            </div>
                """,true);

        } catch(MessagingException e){
            e.printStackTrace();
        }
        Map<String, String> result = new HashMap<>();
        result.put("email",email);
        result.put("verifyCode", String.valueOf(verifyCode));

        return result;
    }

    private int verifyCodeCreate(){
        int verifyCode = (int)(Math.random() * (90000))+ 100000;
        return verifyCode;
    }
    @Override
    public String verifyCodeEmail(Map<String, String> verifyInfo) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'verifyCodeEmail'");
    }

}
