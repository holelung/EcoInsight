package com.semi.ecoinsight.notice.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.semi.ecoinsight.admin.model.dto.PageInfo;
import com.semi.ecoinsight.board.model.dto.BoardDTO;


@Mapper
public interface NoticeMapper {

    // 공지사항 번호
    Long selectNoticeNo(Long memberNo);
    
    
    // 일반 사용자용 공지사항목록 조회
    List<BoardDTO> selectNoticeList(PageInfo pageInfo);
    
    // 게시글 세부 페이지 조회용
    BoardDTO selectNoticeDetail(Long boardNo);
    // 조회수 증가
    void increaseNoticeViewCount(Long boardNo);
    
    // 전체 게시글 수 확인
    Long selectTotalNoticeCount(String category);
    
    
    /* 관리자용 */

    // 관리자용 공지사항 목록
    List<BoardDTO> selectNoticeListForAdmin(PageInfo pageInfo);
    // 관리자페이지용 게시글 수 확인
    Long selectTotalNoticeCountForAdmin(PageInfo pageInfo);
    
    /**
     * dashboard용
     */
    // 월단위 총 게시글 수
    Long selectTotalNoticeCountByMonth();
    Long selectTotalNoticeCountByLastMonth();
    // 월단위 총 조회수
    Long selectTotalNoticeViewCountByMonth();
    Long selectTotalNoticeViewCountByLastMonth();
    // 총 조회수
    Long selectTotalViewCount();
}
