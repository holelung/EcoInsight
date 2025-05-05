package com.semi.ecoinsight.notice.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.semi.ecoinsight.board.model.dto.BoardDTO;


@Mapper
public interface NoticeMapper {

    // 공지사항 번호
    Long selectNoticeNo(Long memberNo);
    // 관리자용 공지사항 목록
    List<BoardDTO> selectNoticeListForAdmin(Map<String, String> pageInfo);
    List<BoardDTO> selectSearchedNoticeListForAdmin(Map<String, String> pageInfo);

    // 일반 사용자용 공지사항
    List<BoardDTO> selectNoticeList(Map<String, String> pageInfo);
    List<BoardDTO> selectNoticeListBySearch(Map<String, String> pageInfo);

    List<BoardDTO> selectNoticeListByCategory(Map<String, String> pageInfo);

    // 게시글 세부 페이지 조회용
    BoardDTO selectNoticeDetail(Long boardNo);
    // 조회수 증가
    void increaseNoticeViewCount(Long boardNo);

    // 전체 게시글 수 확인
    Long selectTotalNoticeCount();
    Long selectNoticeCountByCategoryId(String category);

    // 관리자페이지용 게시글 수 확인
    Long selectTotalNoticeCountForAdmin();
    Long selectNoticeCountBySearch(Map<String, String> pageInfo);
    

    /**
     * dashboard용
     */
    // 월단위 총 게시글 수
    Long selectTotalNoticeCountByMonth();
    Long selectTotalNoticeCountByLastMonth();
    // 월단위 총 조회수
    Long selectTotalNoticeViewCountByMonth();
    Long selectTotalNoticeViewCountByLastMonth();
    
}
