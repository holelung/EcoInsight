package com.semi.ecoinsight.auth.model.service;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.semi.ecoinsight.auth.model.dao.AuthMapper;
import com.semi.ecoinsight.auth.model.vo.CustomUserDetails;
import com.semi.ecoinsight.auth.model.vo.LoginInfo;
import com.semi.ecoinsight.auth.model.vo.VerifyCodeEmail;
import com.semi.ecoinsight.exception.util.CustomAuthenticationException;
import com.semi.ecoinsight.exception.util.CustomMessagingException;
import com.semi.ecoinsight.exception.util.InvalidUserNameAndEmailException;
import com.semi.ecoinsight.exception.util.VerifyCodeExpiredException;
import com.semi.ecoinsight.exception.util.VerifyCodeIsIncorrectException;
import com.semi.ecoinsight.member.model.dao.MemberMapper;
import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.member.model.vo.Member;
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
  private final MemberMapper memberMapper;
  private final PasswordEncoder passwordEncoder;       // BCryptPasswordEncoder 등

  @Override
  public Map<String, Object> adminLogin(MemberDTO member){
    Map<String, Object> loginResponse = login(member);
    LoginInfo loginInfo = (LoginInfo)loginResponse.get("loginInfo");
    if (!(loginInfo.getMemberRole()).equals("ROLE_ADMIN")){
      throw new CustomAuthenticationException("권한이 없습니다.");
    }
    return loginResponse;
  }
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

  private void sendCodeEmail(String email){
    int verifyCode = verifyCodeCreate();
    MimeMessage message = sender.createMimeMessage();
    try{
        MimeMessageHelper helper = new MimeMessageHelper(message,false, "UTF-8");
        helper.setTo(email);
        helper.setSubject("Eco-Insight 이메일 인증 번호입니다.");
        helper.setText("""
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
        throw new CustomMessagingException("인증코드 전송 실패");
    }
    VerifyCodeEmail verifyEmail = VerifyCodeEmail.builder()
                                                  .email(email)
                                                  .verifyCode(String.valueOf(verifyCode))
                                                  .build();
    authMapper.sendCodeEmail(verifyEmail);
  }

  private int verifyCodeCreate(){
    int verifyCode = (int)(Math.random() * (90000))+ 100000;
    return verifyCode;
  }
  @Override
  public void sighUpEmailCode(Map<String, String> email) {
    if (authMapper.checkEmail(email.get("email")) != null){
      throw new InvalidUserNameAndEmailException("유효하지 않은 사용자 이름과 이메일입니다.");
    }
    sendCodeEmail(email.get("email"));
  }
  @Override
  public void findIdEmailCode(Map<String, String> email){
    LoginInfo memberInfo = authMapper.checkEmail(email.get("email"));
    if(memberInfo == null || !memberInfo.getMemberName().equals(email.get("memberName"))){
      throw new InvalidUserNameAndEmailException("유효하지 않은 사용자 이름과 이메일입니다.");
    }
    sendCodeEmail(email.get("email"));
  }
  @Override
  public void findPasswordEmailVerifyCodeSend(Map<String, String> verifyInfo){
    String userId = verifyInfo.get("id");
    String email  = verifyInfo.get("email");

    // 1. 사용자 존재 여부 확인
    MemberDTO member = memberMapper.getMemberByMemberId(userId);
    if (member == null) {
      throw new InvalidUserNameAndEmailException("유효하지 않은 사용자 아이디입니다.");
    }
    // 2. 이메일 일치 여부 확인
    if (!member.getEmail().equals(email)) {
      throw new InvalidUserNameAndEmailException("유효하지 않은 이메일입니다.");
    }
    sendCodeEmail(email);
  }

  @Override
  public String findPasswordEmailCode(Map<String, String> verifyInfo) {
    String userId = verifyInfo.get("id");
    String email  = verifyInfo.get("email");
    
    // 1. 사용자 존재 여부 확인
    MemberDTO member = memberMapper.getMemberByMemberId(userId);
    if (member == null) {
      throw new InvalidUserNameAndEmailException("유효하지 않은 사용자 아이디입니다.");
    }
    // 2. 이메일 일치 여부 확인
    if (!member.getEmail().equals(email)) {
      throw new InvalidUserNameAndEmailException("유효하지 않은 이메일입니다.");
    }
    checkVerifyCode(verifyInfo);

    // 3. 임시 비밀번호 생성
    String tempPassword = generateTempPassword();  

    // 4. 암호화 후 DB 저장
    String encrypted = passwordEncoder.encode(tempPassword);
    Map<String, Object> passwordEntity = new HashMap();
    passwordEntity.put("encodedPassword", encrypted);
    passwordEntity.put("memberNo",member.getMemberNo());
    memberMapper.updatePassword(passwordEntity);
    // 5. 이메일 제목·본문 구성 (HTML)
    String subject = "[EcoInsight] 임시 비밀번호 안내";
    String template = """
        <div style="width:100%%; background:#f4f4f4; padding:20px; font-family:Arial,sans-serif;">
          <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden;">
            <div style="background:#4CAF50; color:#fff; padding:20px; text-align:center;">
              <h1>Eco-Insight 임시 비밀번호 안내</h1>
            </div>
            <div style="padding:20px; color:#333;">
              <p>안녕하세요, %s님</p>
              <p>요청하신 임시 비밀번호는 아래와 같습니다.</p>
              <div style="text-align:center; margin:20px 0;">
                <span style="display:inline-block; font-size:24px; font-weight:bold; color:#4CAF50;
                              padding:10px 20px; border:2px dashed #4CAF50; border-radius:4px;">
                  %s
                </span>
              </div>
              <p>로그인 후 반드시 비밀번호를 변경해 주세요.</p>
              <p>감사합니다.</p>
            </div>
          </div>
        </div>
        """;
    // 실제 치환
    String htmlBody = String.format(template, member.getMemberName(), tempPassword);

    // 6. 메일 전송 (JavaMailSender 직접 사용)
    try {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);   // true = HTML 모드
        sender.send(message);
    } catch (MessagingException e) {
        throw new CustomMessagingException("임시 비밀번호 안내 메일 전송에 실패했습니다.");
    }
    return "임시 비밀번호 안내 메일 전송 성공";
  }
  private String generateTempPassword() {
    SecureRandom rnd = new SecureRandom();
    String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    StringBuilder sb = new StringBuilder(10);
    for (int i = 0; i < 10; i++) {
        sb.append(chars.charAt(rnd.nextInt(chars.length())));
    }
    return sb.toString();
  }

  @Override
  public void changeEmailCode(Map<String, String> email){
    if(authMapper.checkEmail(email.get("email")) != null){
      throw new InvalidUserNameAndEmailException("유효하지 않은 사용자 이름과 이메일입니다.");
    }
    sendCodeEmail(email.get("email"));
  }


  @Override
  public String checkVerifyCode(Map<String, String> verifyInfo) {
    // 인증을 요청을 받았을 때 데이터베이스에 검증 하는데 요청 보낸시간+3분 이내에 요청이 왔는지 검증
    // select 검증해야할 번호, 생성시간 where 보낸이메일 order by desc limit 1; 
    // 현재시간 > 생성시간 + 3분 true -> 예외처리
    // False -> 인증번호 비교  
    VerifyCodeEmail verifyCodeEmail = VerifyCodeEmail.builder().email(verifyInfo.get("email")).verifyCode(verifyInfo.get("verifyCode")).build();
    VerifyCodeEmail checkVerify = authMapper.checkVerifyCode(verifyCodeEmail);
    log.info("{}",checkVerify);
    if (checkVerify == null){
      throw new VerifyCodeIsIncorrectException("인증코드가 맞지 않습니다.");
    }
    Date createDate = checkVerify.getCreateDate();
    long nowMillis = System.currentTimeMillis();
    long expireMillis = createDate.getTime()+ 180000L;
    if (nowMillis > expireMillis){
      throw new VerifyCodeExpiredException("인증 시간이 만료되었습니다.");
    }
    MemberDTO member = memberMapper.getMemberByEmail(verifyCodeEmail.getEmail());
    if(member != null){
      return member.getMemberId();
    }
    return "이메일 인증에 성공하였습니다.";
  }
  @Override
  public CustomUserDetails getUserDetails() {
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
      return user;
  }
  
  @Override
  public boolean isAdmin() {
      return getUserDetails().getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
  }

  @Override
  public Map<String, Object> googleLogin(Map<String, String> body){
    String token = body.get("token");
    GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
      new NetHttpTransport(),
      GsonFactory.getDefaultInstance()
    )
    .setAudience(Collections.singletonList("617855234940-dp6iq2v93alink0ttpmgadohvbhj0fo5.apps.googleusercontent.com"))
    .build();
    log.info("{}",body);
    try{
      GoogleIdToken idToken = verifier.verify(token);
      if (idToken == null){
        throw new CustomMessagingException("유효하지 않은 Google 토큰입니다.");
      }

      Payload payload = idToken.getPayload();
      String email = payload.getEmail();
      String name = (String) payload.get("name");
      String googleSub = payload.getSubject();
      // 기존 회원 확인
      MemberDTO member = memberMapper.getMemberByEmail(email);
      if (member == null){
        Member memberValue = Member.builder()
          .memberName(name)
          .memberPw(passwordEncoder.encode(googleSub))
          .memberId(email)
          .email(email)
          .memberRole("ROLE_COMMON")
          .build();
        memberMapper.signUp(memberValue);
        member = memberMapper.getMemberByEmail(email);
      }
      return googleLoginSection(member);
    } catch(Exception e) {
      e.printStackTrace();
      throw new CustomAuthenticationException("구글 로그인 처리 실패");
    }
  }
  private Map<String, Object> googleLoginSection(MemberDTO member) {
    // CustomUserDetails 생성
    CustomUserDetails loginMember = CustomUserDetails.builder()
        .memberNo(member.getMemberNo())
        .username(member.getMemberId())
        .password(member.getMemberPw())   // 실제 검사하진 않음
        .email(member.getEmail())
        .memberName(member.getMemberName())
        .memberRole(member.getMemberRole())
        .isActive(member.getIsActive())
        .authorities(Collections.singletonList(
            new SimpleGrantedAuthority(member.getMemberRole())
        ))
        .build();

    // SecurityContext에 직접 인증 정보 등록
    UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(
            loginMember,
            null,
            loginMember.getAuthorities()
        );
    SecurityContextHolder.getContext().setAuthentication(authentication);

    // JWT 발급 및 LoginInfo 구성
    Map<String, Object> loginResponse = new HashMap<>();
    loginResponse.put("tokens",
        tokenService.generateToken(
            loginMember.getUsername(),
            loginMember.getMemberNo()
        )
    );
    LoginInfo loginInfo = LoginInfo.builder()
        .memberNo(String.valueOf(loginMember.getMemberNo()))
        .username(loginMember.getUsername())
        .email(loginMember.getEmail())
        .memberName(loginMember.getMemberName())
        .memberRole(loginMember.getMemberRole())
        .isActive(loginMember.getIsActive())
        .build();
    loginResponse.put("loginInfo", loginInfo);

    return loginResponse;
  }
}
