package com.semi.ecoinsight.auth.controller;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
public class MailController {

        private JavaMailSender sender;

        @GetMapping("send")
        public String sendMail(/* @RequestBody String email */) throws MessagingException{
            // SimpleMailMessage message = new SimpleMailMessage();

            // // 메시지 정보
            // // 제목, 내용, 받는사람, 참조, 숨은 참조
            // // 쪼금 진화시키면 첨부파일

            // // 제목 작성하기
            // message.setSubject("");
            // // 본문 작성하기
            // message.setText("내용");

            // // 받는 이
            // // message.setTo("daewook0401@naver.com");
            // String[] to = {"daewook0401@naver.com", "junho3004@naver.com", "khacademy1002@gmail.com"};
            // message.setTo(to);

            // // 참조는 setCc / 숨은참조 setBcc

            // sender.send(message);

            MimeMessage message = sender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message,false, "UTF-8");
            
            helper.setSubject("[비밀번호변경] 까먹었음");

            String tmpPassword = "123";
            helper.setText("<a stype='color:red' href='http://localhost:5173/auth?authCode=123'>요거눌러보세요~</a>", true);

            return "메일 전송 성공";
        }
}
