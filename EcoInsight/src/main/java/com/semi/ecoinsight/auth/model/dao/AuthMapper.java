package com.semi.ecoinsight.auth.model.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthMapper {

    void sendCodeEmail(Map<String, String> result);
    
}
