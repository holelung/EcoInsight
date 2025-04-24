package com.semi.ecoinsight.exception;


import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.exception.util.CustomAuthenticationException;
import com.semi.ecoinsight.exception.util.FileStreamException;
import com.semi.ecoinsight.exception.util.FileTypeNotAllowedException;
import com.semi.ecoinsight.exception.util.MemberIdDuplicateException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class GlobalExceptionHandler {

	private ResponseEntity<Map<String, String>> makeResponseEntity(RuntimeException e, HttpStatus status){
		Map<String, String> error = new HashMap<>();
		error.put("error-message", e.getMessage());
		return ResponseEntity.status(status).body(error);
	}

	@ExceptionHandler(MemberIdDuplicateException.class)
    public ResponseEntity<Map<String, String>> handleMemberIdDuplicateException(MemberIdDuplicateException e){
        return makeResponseEntity(e, HttpStatus.BAD_REQUEST);
    }
	@ExceptionHandler(CustomAuthenticationException.class)
	public ResponseEntity<Map<String, String>> handleCustomAuthenticationException(CustomAuthenticationException e) {
		return makeResponseEntity(e, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<Map<String, String>> handleAccessDeniedException(AccessDeniedException e) {
		return makeResponseEntity(e, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(FileStreamException.class)
	public ResponseEntity<Map<String, String>> handleFileStreamException(FileStreamException e) {
		return makeResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(FileTypeNotAllowedException.class)
	public ResponseEntity<Map<String, String>> handleFileTypeNotAllowedException(FileTypeNotAllowedException e) {
		return makeResponseEntity(e, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
	}
}
