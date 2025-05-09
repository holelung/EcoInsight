package com.semi.ecoinsight.exception;


import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.semi.ecoinsight.exception.util.BoardInsertException;
import com.semi.ecoinsight.exception.util.CommunityAccessException;
import com.semi.ecoinsight.exception.util.CustomAuthenticationException;

import com.semi.ecoinsight.exception.util.CustomMessagingException;
import com.semi.ecoinsight.exception.util.CustomSqlException;
import com.semi.ecoinsight.exception.util.InvalidUserNameAndEmailException;
import com.semi.ecoinsight.exception.util.LargePointValueException;
import com.semi.ecoinsight.exception.util.FileStreamException;
import com.semi.ecoinsight.exception.util.FileTypeNotAllowedException;
import com.semi.ecoinsight.exception.util.ImageInsertException;
import com.semi.ecoinsight.exception.util.InvalidAccessException;
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
    public ResponseEntity<Map<String, String>> handleMemberIdDuplicateException(MemberIdDuplicateException e){
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

	@ExceptionHandler(BoardInsertException.class)
	public ResponseEntity<Map<String, String>> handleBoardInsertException(BoardInsertException e) {
		return makeResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(ImageInsertException.class)
	public ResponseEntity<Map<String, String>> handleImageInsertException(ImageInsertException e) {
		return makeResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(CommunityAccessException.class)
	public ResponseEntity<?> handleCommunityAccessException(CommunityAccessException e){
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage()); 
	}

	@ExceptionHandler(InvalidAccessException.class)
	public ResponseEntity<Map<String, String>> handleInvalidAccessException(InvalidAccessException e) {
		return makeResponseEntity(e, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(LargePointValueException.class)
	public ResponseEntity<Map<String, String>> LargePointValueException(LargePointValueException e) {
		return makeResponseEntity(e, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(CustomSqlException.class)
	public ResponseEntity<Map<String, String>> CustomSqlException(CustomSqlException e) {
		return makeResponseEntity(e, HttpStatus.NOT_FOUND);
	}


}
