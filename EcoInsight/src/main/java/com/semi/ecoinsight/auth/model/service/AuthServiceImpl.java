package com.semi.ecoinsight.auth.model.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.semi.ecoinsight.auth.model.dao.AuthMapper;
import com.semi.ecoinsight.auth.model.vo.CustomUserDetails;
import com.semi.ecoinsight.auth.model.vo.LoginInfo;
import com.semi.ecoinsight.auth.model.vo.VerifyCodeEmail;
import com.semi.ecoinsight.exception.util.CustomAuthenticationException;
import com.semi.ecoinsight.exception.util.CustomMessagingException;
import com.semi.ecoinsight.exception.util.VerifyCodeExpiredException;
import com.semi.ecoinsight.exception.util.VerifyCodeIsIncorrectException;
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
    private final AuthMapper authMapper;
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
        return loginResponse;
    }

    @Override
    public void sendCodeEmail(VerifyCodeEmail email) {
        String emailString = email.getEmail();
        int verifyCode = verifyCodeCreate();
        MimeMessage message = sender.createMimeMessage();
        try{
            MimeMessageHelper helper = new MimeMessageHelper(message,false, "UTF-8");
            helper.setTo(emailString);
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
            sender.send(message);
        } catch(MessagingException e){
            e.printStackTrace();
            throw new CustomMessagingException("메세지 전송 실패");
        }
        VerifyCodeEmail verifyEmail = VerifyCodeEmail.builder()
                                                     .email(emailString)
                                                     .verifyCode(String.valueOf(verifyCode))
                                                     .build();
        authMapper.sendCodeEmail(verifyEmail);
    }

    private int verifyCodeCreate(){
      
      int verifyCode = (int)(Math.random() * (90000))+ 100000;
      return verifyCode;
    }

    @Override
    public String checkVerifyCode(VerifyCodeEmail verifyInfo) {
      // 인증을 요청을 받았을 때 데이터베이스에 검증 하는데 요청 보낸시간+3분 이내에 요청이 왔는지 검증
      // select 검증해야할 번호, 생성시간 where 보낸이메일 order by desc limit 1; 
      // 현재시간 > 생성시간 + 3분 true -> 예외처리
      // False -> 인증번호 비교  

      VerifyCodeEmail checkVerify = authMapper.checkVerifyCode(verifyInfo);
      if (checkVerify == null){
        throw new VerifyCodeIsIncorrectException("인증코드가 맞지 않습니다.");
      }
      Date createDate = checkVerify.getCreateDate();
      long nowMillis = System.currentTimeMillis();
      long expireMillis = createDate.getTime()+ 180000L;
      if (nowMillis > expireMillis){
        throw new VerifyCodeExpiredException("인증 시간이 만료되었습니다.");
      }
      return "이메일 인증에 성공하였습니다.";
    }

}
