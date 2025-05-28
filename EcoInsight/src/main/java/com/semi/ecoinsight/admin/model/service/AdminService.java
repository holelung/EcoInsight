package com.semi.ecoinsight.admin.model.service;


import java.util.List;
import java.util.Map;

import com.semi.ecoinsight.admin.model.dto.BanDTO;
import com.semi.ecoinsight.admin.model.dto.CertifyDTO;
import com.semi.ecoinsight.admin.model.dto.PageInfo;
import com.semi.ecoinsight.admin.model.dto.PointDTO;
import com.semi.ecoinsight.admin.model.dto.SummaryCardDTO;
import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;



public interface AdminService {
    
    // 공지사항 작성
    void insertNotice(WriteFormDTO form);
    // 공지사항 목록 조회(관리자)
    Map<String, Object> selectNoticeListForAdmin(PageInfo pageInfo);
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
    Map<String, Object> selectCommunityForAdmin(PageInfo pageInfo);
    // 삭제(블라인드 처리)
    void deleteCommunity(Long boardNo);
    void restoreCommunity(Long boardNo);

    
    // 계정 관리
    // 조회
    Map<String, Object> selectAccountList(PageInfo pageInfo);
    // 계정 정지
    void disableAccount(BanDTO banInfo);

    void enableAccount(Long memberNo);
    
    
    // 인증게시판 관리
    Map<String, Object> selectAuthBoardList(PageInfo pageInfo);
    // 인증
    void handleCertify(CertifyDTO certify);

    void deleteAuthBoard(Long boardNo);
    void restoreAuthBoard(Long boardNo);

    // 포인트 관리
    // 조회
    Map<String, Object> selectPointList(PageInfo pageInfo);

    // 포인트 지급/회수
    void insertPoint(PointDTO points);

    Map<String, Object> selectPointDetail(Long memberNo);


    // summaryCard
    List<SummaryCardDTO> selectNoticeSummaryCards();
    List<SummaryCardDTO> selectCommunitySummaryCards();
    List<SummaryCardDTO> selectAuthBoardSummaryCards();
    List<SummaryCardDTO> selectAccountSummaryCards();
    List<SummaryCardDTO> selectPointSummaryCards();
}
