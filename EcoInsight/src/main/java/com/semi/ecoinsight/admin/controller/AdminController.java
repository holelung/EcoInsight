package com.semi.ecoinsight.admin.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.admin.model.dto.BanDTO;
import com.semi.ecoinsight.admin.model.dto.CertifyDTO;
import com.semi.ecoinsight.admin.model.dto.PageInfo;
import com.semi.ecoinsight.admin.model.dto.PointDTO;
import com.semi.ecoinsight.admin.model.dto.SummaryCardDTO;
import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.admin.model.service.AdminService;
import com.semi.ecoinsight.exception.util.InvalidAccessException;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    
    /* 공지사항 */
    // 공지사항 작성
    @PostMapping("/notice-write")
    public ResponseEntity<HttpStatus> noticeWrite(@RequestBody @Valid WriteFormDTO writeForm) {
        
        adminService.insertNotice(writeForm);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 글 전체 조회
    @GetMapping("/notice")
    public ResponseEntity<Map<String, Object>> selectNoticeListForAdmin(
            @ModelAttribute PageInfo pageInfo) {
                
        return ResponseEntity.ok(adminService.selectNoticeListForAdmin(pageInfo));
    }

    // 공지사항 수정
    @PutMapping("/notice")
    public ResponseEntity<HttpStatus> modifyNotice(@RequestBody @Valid WriteFormDTO writeForm) {
        
        adminService.updateNotice(writeForm);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 공지사항 삭제
    @DeleteMapping("/notice")
    public ResponseEntity<String> deleteNotice(@RequestParam(name="boardNo") Long boardNo) {

        adminService.deleteNotice(boardNo);
        
        return ResponseEntity.status(HttpStatus.OK).body("글이 비활성화 되었습니다.");
    }
    
    // 공지사항 복원
    @PatchMapping("/notice/restore")
    public ResponseEntity<String> restoreNotice(@RequestBody Map<String, String> body) {
        
        adminService.restoreNotice(Long.parseLong(body.get("boardNo")));
        
        return ResponseEntity.status(HttpStatus.OK).body("글이 활성화 되었습니다.");
    }




    /*  DashBoard  */
    // 요약 카드
    @GetMapping("/summary-card")
    public ResponseEntity<List<SummaryCardDTO>> getSummaryCard(@RequestParam(name = "type") String type) {
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




    /* 커뮤니티 관리 */
    // 조회
    @GetMapping("/community")
    public ResponseEntity<Map<String, Object>> getMethodName(@ModelAttribute PageInfo pageInfo) {
        
        return ResponseEntity.ok(adminService.selectCommunityForAdmin(pageInfo));
    }

    // 삭제
    @DeleteMapping("/community")
    public ResponseEntity<String> deleteCommunity(@RequestParam(name="boardNo") Long boardNo) {

        adminService.deleteCommunity(boardNo);
        return ResponseEntity.status(HttpStatus.OK).body("글이 비활성화 되었습니다.");
    }
    
    // 복원
    @PatchMapping("/community/restore")
    public ResponseEntity<String> restoreCommunity(@RequestBody Map<String, String> body) {

        adminService.restoreCommunity(Long.parseLong(body.get("boardNo")));
        return ResponseEntity.status(HttpStatus.OK).body("글이 활성화 되었습니다.");
    }
    

    /* 계정 관리 */

    // 계정 목록 조회
    @GetMapping("/account")
    public ResponseEntity<Map<String,Object>> getAccountList(@ModelAttribute PageInfo pageInfo) {
        
        return ResponseEntity.ok(adminService.selectAccountList(pageInfo));
    }
    
    // 계정 정지
    @DeleteMapping("/account")
    public ResponseEntity<HttpStatus> disableAccount(@ModelAttribute BanDTO banInfo) {
        log.info("정지 요청:{}", banInfo);
        adminService.disableAccount(banInfo);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 정지 해제
    @PatchMapping("/account")
    public ResponseEntity<HttpStatus> enableAccount(@RequestBody BanDTO banInfo) {
        log.info("정지 해제 요청:{}", banInfo);
        adminService.enableAccount(banInfo.getMemberNo());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    /* 포인트 관리 */

    // 포인트 목록 조회
    @GetMapping("/point")
    public ResponseEntity<Map<String,Object>> getPointList(@ModelAttribute PageInfo pageInfo) {

        return ResponseEntity.ok(adminService.selectPointList(pageInfo));
    }
    
    // 포인트 적립
    @PostMapping("/point")
    public ResponseEntity<HttpStatus> insertPoint(@RequestBody PointDTO point) {
        adminService.insertPoint(point);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 유저별 포인트 목록 조회
    @GetMapping("/point/detail")
    public ResponseEntity<Map<String,Object>> getPointDetail(@RequestParam(name = "memberNo") Long memberNo) {
        
        return ResponseEntity.ok(adminService.selectPointDetail(memberNo));
    }
    
    /* 인증 게시판 관리 */

    // 인증 게시판 목록 조회
    @GetMapping("/authboard")
    public ResponseEntity<Map<String,Object>> getAuthboard(@ModelAttribute PageInfo pageInfo) {
        
        return ResponseEntity.ok(adminService.selectAuthBoardList(pageInfo));
    }
    
    // 게시글 인증 처리
    @PatchMapping("/authboard/cert")
    public ResponseEntity<String> handleCertify(@RequestBody CertifyDTO data) {
        adminService.handleCertify(data);
        return ResponseEntity.status(HttpStatus.OK).body("인증상태가 변경 되었습니다.");
    }

    // 게시글 삭제
    @DeleteMapping("/authboard")
    public ResponseEntity<String> deleteAuthBoard(@RequestParam(name = "boardNo") Long boardNo) {
        
        adminService.deleteAuthBoard(boardNo);
        return ResponseEntity.status(HttpStatus.OK).body("글이 삭제되었습니다.");
    }

    // 게시글 복원
    @PatchMapping("/authboard/restore")
    public ResponseEntity<String> restoreAuthBoard(@RequestBody Map<String, Long> data) {
        
        adminService.restoreAuthBoard(data.get("boardNo"));
        return ResponseEntity.status(HttpStatus.OK).body("글이 복원되었습니다.");
    }

}
