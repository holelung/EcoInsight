package com.semi.ecoinsight.board.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.board.model.dto.UploadImageDTO;

@Mapper
public interface BoardMapper {
    void uploadNoticeImage(UploadImageDTO uploadImage);
}
