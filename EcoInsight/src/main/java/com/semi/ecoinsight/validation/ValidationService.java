package com.semi.ecoinsight.validation;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.exception.util.InvalidAccessException;

@Service
public class ValidationService {
    
    // 인덱스가 1보다 작을 떄(일어날리 없음)
    public void invalidIndexAccessHandler(Long num) {
        if (num < 1) {
            throw new InvalidAccessException("잘못된 접근입니다.");
        }
    }

    public void validateNegativeNumber(int num) {
        if (num < 0) {
            throw new InvalidAccessException("잘못된 접근입니다.");
        }
    }



}
