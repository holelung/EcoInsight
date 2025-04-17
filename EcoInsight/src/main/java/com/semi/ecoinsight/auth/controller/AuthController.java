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
@RequestMapping("auth")
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
    public ResponseEntity<Map<String, String>> sendCodeEmail(@RequestBody String email){
        Map<String, String> verifyCodeResult = authService.sendCodeEmail(email);
        return ResponseEntity.status(HttpStatus.CREATED).body(verifyCodeResult);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<String> verifyCodeEmail(@RequestBody Map<String, String> verifyInfo){
        String successMsg = authService.verifyCodeEmail(verifyInfo);
        return ResponseEntity.ok(successMsg);
    }
}
