package com.semi.ecoinsight.admin.model.dao;


import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.admin.model.vo.Notice;

@Mapper
public interface AdminMapper {
    
    void insertNotice(Notice notice);

    Long getNoticeNo(Long memberNo);
}
