package com.semi.ecoinsight.auth.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.auth.model.vo.LoginInfo;
import com.semi.ecoinsight.auth.model.vo.VerifyCodeEmail;

@Mapper
public interface AuthMapper {

    LoginInfo checkEmail(String email);

    void sendCodeEmail(VerifyCodeEmail result);

    VerifyCodeEmail checkVerifyCode(VerifyCodeEmail verifyInfo);
}
