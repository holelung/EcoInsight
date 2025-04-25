package com.semi.ecoinsight.exception.util;

public class InvalidUserNameAndEmailException extends RuntimeException{
    public InvalidUserNameAndEmailException(String message){
        super(message);
    }
}
