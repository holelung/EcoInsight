package com.semi.ecoinsight.auth.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.auth.model.service.AuthService;
import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.token.model.service.TokenService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody MemberDTO member){
        Map<String, Object> loginResponse = authService.login(member);
        return ResponseEntity.ok(loginResponse);
    }


    @PostMapping("/send-code")
    public ResponseEntity<String> sighUpEmailCode(@RequestBody Map<String, String> email){
        authService.sighUpEmailCode(email);
        return ResponseEntity.status(HttpStatus.CREATED).body("인증 코드 이메일 발송 성공");
    }

    @PostMapping("/find-id")
    public ResponseEntity<String> findIdEmailCode(@RequestBody Map<String, String> email){
        authService.findIdEmailCode(email);
        return ResponseEntity.status(HttpStatus.CREATED).body("인증 코드 이메일 발송 성공");
    }

    @PostMapping("/find-password")
    public ResponseEntity<String> findPasswordEmailVerifyCodeSend(@RequestBody Map<String, String> email){
        authService.findPasswordEmailVerifyCodeSend(email);
        return ResponseEntity.status(HttpStatus.CREATED).body("인증 코드 이메일 발송 성공");
    }
    @PostMapping("/verifycode-password")
    public ResponseEntity<String> findPasswordEmailCode(@RequestBody Map<String, String> email){
        String successMsg = authService.findPasswordEmailCode(email);
        return ResponseEntity.ok(successMsg);
    }
    @PostMapping("/change-email")
    public ResponseEntity<String> changeEmailCode(@RequestBody Map<String, String> email){
        authService.changeEmailCode(email);
        return ResponseEntity.status(HttpStatus.CREATED).body("인증 코드 이메일 발송 성공");
    }

    @PostMapping("/verify-code")
    public ResponseEntity<String> checkVerifyCode(@RequestBody Map<String, String> verifyInfo){
        String successMsg = authService.checkVerifyCode(verifyInfo);
        return ResponseEntity.ok(successMsg);
    }

    @PostMapping("/admin-login")
    public ResponseEntity<Map<String, Object>> adminLogin(@Valid @RequestBody MemberDTO member){
        Map<String, Object> loginResponse = authService.adminLogin(member);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body){
        Map<String, Object> result = authService.googleLogin(body);
        return ResponseEntity.ok(result);
    }
}
