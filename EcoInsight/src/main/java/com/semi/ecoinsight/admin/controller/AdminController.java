package com.semi.ecoinsight.admin.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.admin.model.dto.SummaryCardDTO;
import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.admin.model.service.AdminService;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.exception.util.InvalidAccessException;
import com.semi.ecoinsight.notice.model.service.NoticeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    
    // 공지사항
    @PostMapping("/notice-write")
    public ResponseEntity<?> noticeWrite(@RequestBody @Valid WriteFormDTO writeForm) {
        log.info("이얏호:{}", writeForm);
        adminService.insertNotice(writeForm);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/notice")
    public ResponseEntity<?> selectNoticeListForAdmin(@RequestParam (name="page", defaultValue="0") int page,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "search", required = false) String search,
            @RequestParam(name = "searchType", required = false) String searchType,
            @RequestParam(name = "sortOrder", defaultValue = "Newest") String sortOrder){
        log.info("page:{}\nsize:{}\nsearch:{}\nsortOrder:{}",page, size, search, searchType, sortOrder);
        return ResponseEntity.ok(adminService.selectNoticeListForAdmin(page, size, search, searchType, sortOrder));
    }

    @PutMapping("/notice")
    public ResponseEntity<?> modifyNotice(@RequestBody @Valid WriteFormDTO writeForm) {
        log.info("공지사항 수정:{}", writeForm);
        adminService.updateNotice(writeForm);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/notice")
    public ResponseEntity<?> deleteNotice(@RequestParam(name="boardNo") Long boardNo) {

        log.info("삭제 요청:{}", boardNo);

        adminService.deleteNotice(boardNo);
        return ResponseEntity.status(HttpStatus.OK).body("글이 비활성화 되었습니다.");
    }
    
    @PatchMapping("/notice/restore")
    public ResponseEntity<?> restoreNotice(@RequestBody Map<String, String> body) {
        Long boardNo = Long.parseLong(body.get("boardNo"));
        log.info("복원 요청:{}", boardNo);
        adminService.restoreNotice(boardNo);
        return ResponseEntity.status(HttpStatus.OK).body("글이 활성화 되었습니다.");
    }

    // DashBoard
    @GetMapping("/summary-card")
    public ResponseEntity<?> getSummaryCard(@RequestParam(name = "type") String type) {
        List<SummaryCardDTO> summaryCards = new ArrayList<SummaryCardDTO>();
        switch (type) {
            case "notice":
                summaryCards = adminService.selectNoticeSummaryCards();
                break;
            case "community":
                summaryCards = adminService.selectCommunitySummaryCards();
                break;
            case "authBoard":
                summaryCards = adminService.selectAuthBoardSummaryCards();
                break;
            case "account":
                summaryCards = adminService.selectAccountSummaryCards();
                break;
            case "point":
                summaryCards = adminService.selectPointSummaryCards();
                break;
            default:
                throw new InvalidAccessException("잘못된 접근입니다.");
        }
        return ResponseEntity.ok(summaryCards);
    }
}
