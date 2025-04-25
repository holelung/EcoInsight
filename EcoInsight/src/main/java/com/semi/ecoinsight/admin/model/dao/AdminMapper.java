package com.semi.ecoinsight.admin.model.dao;


import org.apache.ibatis.annotations.Mapper;


import com.semi.ecoinsight.board.model.vo.Board;

@Mapper
public interface AdminMapper {
    
    void insertNotice(Board board);

    Long getNoticeNo(Long memberNo);
}
