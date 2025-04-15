package com.semi.ecoinsight.token.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.token.model.vo.RefreshToken;


@Mapper
public interface TokenMapper {
    void saveToken(RefreshToken token);
    RefreshToken findByToken(RefreshToken token);
}
