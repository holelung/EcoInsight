package com.semi.ecoinsight.board.model.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;


import com.semi.ecoinsight.board.model.vo.Attachment;

@Mapper
public interface BoardMapper {
    void uploadImage(Attachment attachment);
    void insertViewCount(Map<String, Object> viewCountEntity);
}
