package com.semi.ecoinsight.exception;

public class CustomAuthenticationException extends RuntimeException {
    public CustomAuthenticationException(String message){
        super(message);
    }
}
