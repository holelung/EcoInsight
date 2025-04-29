package com.semi.ecoinsight.authboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.authboard.model.service.AuthBoardService;

import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth-board")
public class AuthBoardController {
	private final AuthBoardService authBoardService;
	
	@PostMapping
	public ResponseEntity<?> uploadAuthBoard(@RequestBody @Validated WriteFormDTO form) {
		try {
            authBoardService.insertAuthBoard(form);
            return ResponseEntity.ok("게시글이 성공적으로 업로드되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("게시글 업로드 실패: " + e.getMessage());
        }
	}
	
    @DeleteMapping("/{boardNo}")
    public ResponseEntity<?> deleteAuthBoard(@PathVariable Long boardNo) {
        authBoardService.deleteAuthBoard(boardNo);
        return ResponseEntity.ok("게시글이 삭제되었습니다.");
    }
}
