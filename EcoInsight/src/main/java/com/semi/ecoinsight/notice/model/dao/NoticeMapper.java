package com.semi.ecoinsight.notice.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.semi.ecoinsight.board.model.dto.BoardDTO;


@Mapper
public interface NoticeMapper {

    Long getNoticeNo(Long memberNo);
    // 관리자용 공지사항 목록
    List<BoardDTO> selectNoticeListForAdmin(Map<String, String> pageInfo);
    
    List<BoardDTO> selectNoticeList(Map<String, String> pageInfo);
    List<BoardDTO> selectNoticeListBySearch(Map<String, String> pageInfo);
    List<BoardDTO> selectNoticeListByCategory(Map<String, String> pageInfo);

    BoardDTO selectNoticeDetail(Long boardNo);

    void increaseNoticeViewCount(Long boardNo);

    Long getTotalNoticeCount();

    Long getNoticeCountByCategoryId(String category);


}
