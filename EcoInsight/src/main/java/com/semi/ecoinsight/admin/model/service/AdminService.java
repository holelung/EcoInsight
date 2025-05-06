package com.semi.ecoinsight.admin.model.service;


import java.util.List;
import java.util.Map;

import com.semi.ecoinsight.admin.model.dto.BanDTO;
import com.semi.ecoinsight.admin.model.dto.SummaryCardDTO;
import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dto.BoardDTO;


public interface AdminService {
    
    // 공지사항 작성
    void insertNotice(WriteFormDTO form);
    // 공지사항 목록 조회(관리자)
    Map<String, Object> selectNoticeListForAdmin(int pageNo, int size, String search, String searchType, String sortOrder);
    // 공지사항 관리
    // 공지사항 수정
    void updateNotice(WriteFormDTO form);
    // 공지사항 삭제(비활성화)
    void deleteNotice(Long boardNo);
    // 공지사항 복원(활성화)
    void restoreNotice(Long boardNo);

    /**
     * 커뮤니티 관리
     **/
    // 조회
    Map<String, Object> selectCommunityForAdmin(int pageNo, int size, String search, String searchType, String sortOrder);
    // 삭제(블라인드 처리)
    void deleteCommunity(Long boardNo);
    void restoreCommunity(Long boardNo);

    
    // 계정 관리
    // 조회
    Map<String, Object> selectAccountList(int pageNo, int size, String search, String searchType, String sortOrder);
    // 계정 정지
    void disableAccount(BanDTO banInfo);

    void enableAccount(Long memberNo);
    
    
    // 인증게시판 관리

    

    // 포인트 관리

    // summaryCard
    List<SummaryCardDTO> selectNoticeSummaryCards();
    List<SummaryCardDTO> selectCommunitySummaryCards();
    List<SummaryCardDTO> selectAuthBoardSummaryCards();
    List<SummaryCardDTO> selectAccountSummaryCards();
    List<SummaryCardDTO> selectPointSummaryCards();
}
