package com.semi.ecoinsight.notice.controller;

import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.notice.model.service.NoticeService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {
    
    private final NoticeService noticeService;

    @GetMapping
    public ResponseEntity<?> getMethodName(@RequestParam(name = "boardNo", required = true) Long boardNo) {
        
        return ResponseEntity.ok(noticeService.selectNoticeDetail(boardNo));
    }
    
}
