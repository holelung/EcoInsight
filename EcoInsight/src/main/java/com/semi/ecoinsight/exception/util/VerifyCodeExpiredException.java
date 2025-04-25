package com.semi.ecoinsight.exception.util;

public class VerifyCodeExpiredException extends RuntimeException{
    public VerifyCodeExpiredException(String message){
        super(message);
    }
}
