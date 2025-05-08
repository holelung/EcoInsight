package com.semi.ecoinsight.authboard.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.authboard.model.service.AuthBoardService;
import com.semi.ecoinsight.board.model.dto.BoardDTO;

import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequestMapping("/auth-boards")
@RequiredArgsConstructor
public class AuthBoardController {

	private final AuthBoardService authBoardService;
	
	@GetMapping
	public ResponseEntity<?> getAuthBoardList(
			@RequestParam(name = "page", defaultValue="0") int page,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "search", required = false) String search,
            @RequestParam(name = "searchType", required = false) String searchType,
            @RequestParam(name = "sortOrder", defaultValue = "Newest") String sortOrder,
			@RequestParam(name = "categoryId", defaultValue = "Newest") String categoryId) {

		return ResponseEntity.ok(authBoardService.selectAuthBoardList(page, size, search, searchType, sortOrder, categoryId));
	}

	@GetMapping("/detail")
	public ResponseEntity<?> getAuthBoardDetail(@RequestParam(name = "boardNo") Long boardNo) {
		return ResponseEntity.ok(authBoardService.selectAuthBoardDetail(boardNo));
	}

	// 글쓰기
	@PostMapping
	public ResponseEntity<?> uploadAuthBoard(@RequestBody @Validated WriteFormDTO form) {
		authBoardService.insertAuthBoard(form);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@PutMapping
	public ResponseEntity<?> updateAuthBoard(@RequestBody WriteFormDTO form) {
		try {
			authBoardService.updateAuthBoard(form);
			return ResponseEntity.ok("게시글이 수정되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("수정 실패: " + e.getMessage());
		}
	}
	
	

	
    @DeleteMapping("/{boardNo}")
    public ResponseEntity<?> deleteAuthBoard(@PathVariable Long boardNo) {
        authBoardService.deleteAuthBoard(boardNo);
        return ResponseEntity.ok("게시글이 삭제되었습니다.");
    }

	
}