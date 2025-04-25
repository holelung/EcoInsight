package com.semi.ecoinsight.auth.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.auth.model.vo.VerifyCodeEmail;

@Mapper
public interface AuthMapper {

    void sendCodeEmail(VerifyCodeEmail result);

    VerifyCodeEmail checkVerifyCode(VerifyCodeEmail verifyInfo);
}
