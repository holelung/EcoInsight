package com.semi.ecoinsight.admin.model.dao;


import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.board.model.vo.Board;




@Mapper
public interface AdminMapper {
    
    void insertNotice(Board board);

    void updateNotice(Long boardNo);

    void deleteNotice(Long boardNo);
    
    void restoreNotice(Long boardNo);
}
