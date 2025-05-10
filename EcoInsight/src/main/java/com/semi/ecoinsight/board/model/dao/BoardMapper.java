package com.semi.ecoinsight.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;


import com.semi.ecoinsight.board.model.vo.Attachment;
import com.semi.ecoinsight.board.model.vo.MainViewCount;
import com.semi.ecoinsight.board.model.vo.PopularPost;

@Mapper
public interface BoardMapper {
    void uploadImage(Attachment attachment);
    void insertViewCount(MainViewCount mainViewCount);
    List<PopularPost> selectDailyPopularPosts();
}
