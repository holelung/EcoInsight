package com.semi.ecoinsight.admin.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.admin.model.dto.BanDTO;
import com.semi.ecoinsight.admin.model.dto.PointDTO;
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
import org.springframework.web.bind.annotation.ModelAttribute;
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
    public ResponseEntity<HttpStatus> noticeWrite(@RequestBody @Valid WriteFormDTO writeForm) {
        log.info("이얏호:{}", writeForm);
        adminService.insertNotice(writeForm);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/notice")
    public ResponseEntity<Map<String, Object>> selectNoticeListForAdmin(
            @RequestParam(name="page", defaultValue="0") int page,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "search", required = false) String search,
            @RequestParam(name = "searchType", required = false) String searchType,
            @RequestParam(name = "sortOrder", defaultValue = "Newest") String sortOrder){
        log.info("page:{}\nsize:{}\nsearch:{}\nsortOrder:{}",page, size, search, searchType, sortOrder);
        return ResponseEntity.ok(adminService.selectNoticeListForAdmin(page, size, search, searchType, sortOrder));
    }

    @PutMapping("/notice")
    public ResponseEntity<HttpStatus> modifyNotice(@RequestBody @Valid WriteFormDTO writeForm) {
        log.info("공지사항 수정:{}", writeForm);
        adminService.updateNotice(writeForm);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/notice")
    public ResponseEntity<String> deleteNotice(@RequestParam(name="boardNo") Long boardNo) {

        log.info("삭제 요청:{}", boardNo);

        adminService.deleteNotice(boardNo);
        return ResponseEntity.status(HttpStatus.OK).body("글이 비활성화 되었습니다.");
    }
    
    @PatchMapping("/notice/restore")
    public ResponseEntity<String> restoreNotice(@RequestBody Map<String, String> body) {
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

        // 커뮤니티 관리
    
    // 조회
    @GetMapping("/community")
    public ResponseEntity<Map<String, Object>> getMethodName(
            @RequestParam(name="page", defaultValue="0") int page,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "search", required = false) String search,
            @RequestParam(name = "searchType", required = false) String searchType,
            @RequestParam(name = "sortOrder", defaultValue = "Newest") String sortOrder) {
        
        log.info("관리자 커뮤니티 리스트 요청:\\n" +
                        "page:{}\\n" + //
                        "size:{}\\n" + //
                        "search:{}\\n" + //
                        "sortOrder:{}", page, size, search, searchType, sortOrder);
        return ResponseEntity.ok(adminService.selectCommunityForAdmin(page, size, search, searchType, sortOrder));
    }
    
    @DeleteMapping("/community")
    public ResponseEntity<String> deleteCommunity(@RequestParam(name="boardNo") Long boardNo) {

        log.info("삭제 요청:{}", boardNo);

        adminService.deleteCommunity(boardNo);
        return ResponseEntity.status(HttpStatus.OK).body("글이 비활성화 되었습니다.");
    }
    
    @PatchMapping("/community/restore")
    public ResponseEntity<String> restoreCommunity(@RequestBody Map<String, String> body) {
        Long boardNo = Long.parseLong(body.get("boardNo"));
        log.info("복원 요청:{}", boardNo);
        adminService.restoreCommunity(boardNo);
        return ResponseEntity.status(HttpStatus.OK).body("글이 활성화 되었습니다.");
    }

    
    // 계정관리
    @GetMapping("/account")
    public ResponseEntity<Map<String,Object>> getAccountList(
            @RequestParam(name = "page", defaultValue="0") int page,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "search", required = false) String search,
            @RequestParam(name = "searchType", required = false) String searchType,
            @RequestParam(name = "sortOrder", defaultValue = "Newest") String sortOrder) 
            {
        
        return ResponseEntity.ok(adminService.selectAccountList(page, size, search, searchType, sortOrder));
    }
    
    @DeleteMapping("/account")
    public ResponseEntity<HttpStatus> disableAccount(@ModelAttribute BanDTO banInfo) {
        log.info("정지 요청:{}", banInfo);
        adminService.disableAccount(banInfo);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/account")
    public ResponseEntity<HttpStatus> enableAccount(@RequestBody BanDTO banInfo) {
        log.info("정지 해제 요청:{}", banInfo);
        adminService.enableAccount(banInfo.getMemberNo());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/point")
    public ResponseEntity<Map<String,Object>> getPointList(
            @RequestParam(name = "page", defaultValue="0") int page,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "search", required = false) String search,
            @RequestParam(name = "searchType", required = false) String searchType,
            @RequestParam(name = "sortOrder", defaultValue = "Newest") String sortOrder) 
    {

        return ResponseEntity.ok(adminService.selectPointList(page, size, search, searchType, sortOrder));
    }
    
    @PostMapping("/point")
    public ResponseEntity<HttpStatus> insertPoint(@RequestBody PointDTO point) {
        adminService.insertPoint(point);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/point/detail")
    public ResponseEntity<Map<String,Object>> getPointDetail(@RequestParam(name = "memberNo") Long memberNo) {
        
        return ResponseEntity.ok(adminService.selectPointDetail(memberNo));
    }
    
    @GetMapping("/authboard")
    public ResponseEntity<Map<String,Object>> getAuthboard(
        @RequestParam(name = "page", defaultValue="0") int page,
        @RequestParam(name = "size") int size,
        @RequestParam(name = "search", required = false) String search,
        @RequestParam(name = "searchType", required = false) String searchType,
        @RequestParam(name = "sortOrder", defaultValue = "Newest") String sortOrder) {
        
        return ResponseEntity.ok(adminService.selectAuthBoardList(page, size, search, searchType, sortOrder));
    }
    

}
