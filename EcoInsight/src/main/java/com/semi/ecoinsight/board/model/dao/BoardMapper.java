package com.semi.ecoinsight.board.model.dao;

import org.apache.ibatis.annotations.Mapper;


import com.semi.ecoinsight.board.model.vo.Attachment;

@Mapper
public interface BoardMapper {
    void uploadImage(Attachment attachment);
}
