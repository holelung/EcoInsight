package com.semi.ecoinsight.notice.controller;

import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.notice.model.service.NoticeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {
    
    private final NoticeService noticeService;

    @GetMapping()
    public ResponseEntity<?> selectNoticeList(
        @RequestParam (name="page", defaultValue="0") int page,
        @RequestParam(name="size") int size,
        @RequestParam(name="category") String category){
        log.info("page:{}\nsize:{}\ncategory:{}", page, size, category);
        return ResponseEntity.ok(noticeService.selectNoticeList(page, size, category));
    }
    

    @GetMapping("/detail")
    public ResponseEntity<?> getMethodName(@RequestParam(name = "boardNo", required = true) Long boardNo) {

        return ResponseEntity.ok(noticeService.selectNoticeDetail(boardNo));
    }
    
}
