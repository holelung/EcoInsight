package com.semi.ecoinsight.notice.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.board.model.vo.Board;

@Mapper
public interface NoticeMapper {

    Long getNoticeNo(Long memberNo);

    Board selectNoticeList();

    Board selectNoticeDetail();

    Board increaseNoticeViewCount(Long boardNo);
}
