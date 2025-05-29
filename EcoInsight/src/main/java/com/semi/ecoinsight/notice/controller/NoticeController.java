package com.semi.ecoinsight.notice.controller;

import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.admin.model.dto.PageInfo;
import com.semi.ecoinsight.notice.model.service.NoticeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {
    
    private final NoticeService noticeService;

    @GetMapping()
    public ResponseEntity<?> selectNoticeList(@ModelAttribute PageInfo pageInfo){
        
        return ResponseEntity.ok(noticeService.selectNoticeList(pageInfo));
    }
    

    @GetMapping("/detail")
    public ResponseEntity<?> getMethodName(@RequestParam(name = "boardNo", required = true) Long boardNo) {

        return ResponseEntity.ok(noticeService.selectNoticeDetail(boardNo));
    }
    
}
