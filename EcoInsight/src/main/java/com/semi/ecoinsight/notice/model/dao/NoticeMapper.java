package com.semi.ecoinsight.notice.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.semi.ecoinsight.board.model.dto.BoardDTO;


@Mapper
public interface NoticeMapper {

    Long getNoticeNo(Long memberNo);

    List<BoardDTO> selectNoticeList(RowBounds rb);

    BoardDTO selectNoticeDetail(Long boardNo);

    void increaseNoticeViewCount(Long boardNo);
}
