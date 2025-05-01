package com.semi.ecoinsight.admin.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.admin.model.service.AdminService;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.notice.model.service.NoticeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    

    @PostMapping("/notice-write")
    public ResponseEntity<?> noticeWrite(@RequestBody @Valid WriteFormDTO writeForm) {
        log.info("이얏호:{}", writeForm);
        adminService.insertNotice(writeForm);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/notice")
    public ResponseEntity<?> selectNoticeListForAdmin(@RequestParam (name="page", defaultValue="0") int page,
            @RequestParam(name="size") int size,
            @RequestParam(name="search", required = false) String search,
            @RequestParam(name="sortOrder", defaultValue = "Newest") String sortOrder){
        log.info("page:{}\nsize:{}\nsearch:{}\nsortOrder:{}",page, size, search, sortOrder);
        return ResponseEntity.ok(adminService.selectNoticeListForAdmin(page, size, search, sortOrder));
    }

    @PutMapping("admin/notice")
    public ResponseEntity<?> updateNotice(@RequestBody Long boardNo) {
        return null;
    }
    
}
