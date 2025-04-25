package com.semi.ecoinsight.exception.util;

public class VerifyCodeIsIncorrectException extends RuntimeException {
    public VerifyCodeIsIncorrectException(String message){
        super(message);
    }
}
