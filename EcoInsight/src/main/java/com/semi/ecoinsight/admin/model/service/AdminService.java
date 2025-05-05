package com.semi.ecoinsight.admin.model.service;


import java.util.List;
import java.util.Map;

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

    // summaryCard
    Map<String, Object> selectNoticeSummaryCards();
    Map<String, Object> selectCommunitySummaryCards();
    Map<String, Object> selectAuthBoardSummaryCards();
    Map<String, Object> selectAccountSummaryCards();
    Map<String, Object> selectPointSummaryCards();
}
