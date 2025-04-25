package com.semi.ecoinsight.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.semi.ecoinsight.exception.util.CustomAuthenticationException;
import com.semi.ecoinsight.exception.util.CustomMessagingException;
import com.semi.ecoinsight.exception.util.InvalidUserNameAndEmailException;
import com.semi.ecoinsight.exception.util.MemberIdDuplicateException;
import com.semi.ecoinsight.exception.util.VerifyCodeExpiredException;
import com.semi.ecoinsight.exception.util.VerifyCodeIsIncorrectException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	private ResponseEntity<Map<String, String>> makeResponseEntity(RuntimeException e, HttpStatus status){
		Map<String, String> error = new HashMap<>();
		error.put("error-message", e.getMessage());
		return ResponseEntity.status(status).body(error);
	}

	@ExceptionHandler(MemberIdDuplicateException.class)
    public ResponseEntity<?> handleMemberIdDuplicateException(MemberIdDuplicateException e){
        return makeResponseEntity(e, HttpStatus.BAD_REQUEST);
    }
	@ExceptionHandler(CustomAuthenticationException.class)
    public ResponseEntity<?> handleCustomAuthenticationException(CustomAuthenticationException e){
        return makeResponseEntity(e, HttpStatus.BAD_REQUEST);
    }
	@ExceptionHandler(CustomMessagingException.class)
    public ResponseEntity<?> handleCustomMessagingException(CustomMessagingException e){
        return makeResponseEntity(e, HttpStatus.BAD_REQUEST);
    }
	@ExceptionHandler(VerifyCodeIsIncorrectException.class)
    public ResponseEntity<?> handleVerifyCodeIsIncorrectException(VerifyCodeIsIncorrectException e){
        return makeResponseEntity(e, HttpStatus.BAD_REQUEST);
    }
	@ExceptionHandler(VerifyCodeExpiredException.class)
    public ResponseEntity<?> handleVerifyCodeExpiredException(VerifyCodeExpiredException e){
        return makeResponseEntity(e, HttpStatus.BAD_REQUEST);
    }
	@ExceptionHandler(InvalidUserNameAndEmailException.class)
    public ResponseEntity<?> handleInvalidUserNameAndEmailException(InvalidUserNameAndEmailException e){
        return makeResponseEntity(e, HttpStatus.BAD_REQUEST);
    }
}
