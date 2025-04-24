package com.semi.ecoinsight.admin.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.admin.model.dto.NoticeDTO;
import com.semi.ecoinsight.admin.model.service.AdminService;
import com.semi.ecoinsight.admin.model.service.AdminServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/notice-write")
    public RequestEntity<?> noticeWrite(@RequestBody NoticeDTO notice) {
        
        log.info("title: {}", notice.getNoticeTitle());
        log.info("content", notice.getNoticeContent());
        return null;
    }
    
}
