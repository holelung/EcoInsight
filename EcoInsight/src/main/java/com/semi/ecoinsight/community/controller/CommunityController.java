package com.semi.ecoinsight.community.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.comment.model.dto.CommentDTO;
import com.semi.ecoinsight.community.model.service.CommunityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;




@Slf4j
@RequestMapping("/api/communities")
@RestController
@RequiredArgsConstructor
public class CommunityController {
	
	private final CommunityService communityService;
	
	@PostMapping("/community-write")
	public ResponseEntity<?> communityWrite(@RequestBody @Valid WriteFormDTO writeForm){
		communityService.insertCommunityBoard(writeForm);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@GetMapping
	public ResponseEntity<List<BoardDTO>> findAllCommunity(@RequestParam(name="page", defaultValue = "0") int page,
														   @RequestParam(name="search", required = false ) String search,
														   @RequestParam(name="categoryId") String categoryId){		
		communityService.findAllCommunity(page, search, categoryId);
		return ResponseEntity.ok(communityService.findAllCommunity(page, search, categoryId));
	}
	
	@GetMapping("/community-detail")
	public ResponseEntity<Map<String,Object>> detailCommunity(@RequestParam(name="boardNo") Long boardNo,
															  @RequestParam(name="categoryId") String categoryId){
		return ResponseEntity.ok(communityService.detailCommunity(boardNo, categoryId));
	}
	
	@PostMapping("/like")
	public ResponseEntity<?> checkedLike(@RequestBody Map<String,String> likeMap){
					
		Long likeCount = communityService.checkedLike(likeMap);
		return ResponseEntity.ok(likeCount);		
	}
	
	@PutMapping("/community-update")
	public ResponseEntity<?> updateCommunity(@RequestBody @Valid WriteFormDTO writeForm){
		communityService.updateCommunity(writeForm);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
	
	
	@DeleteMapping("/community-delete")
	public ResponseEntity<?> deleteCommunity(@RequestBody Map<String,Long> deleteMap) {
		communityService.deleteCommunity(deleteMap);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
	
	@PostMapping("/comments")
	public ResponseEntity<?> insertCommunityComment(@Valid @RequestBody CommentDTO comment){
		
		communityService.insertCommunityComment(comment);
		
		return ResponseEntity.status(HttpStatus.OK).build();
		
	}
	
	@GetMapping("/comments-List")
	public ResponseEntity<List<CommentDTO>> findCommunityCommentList(@RequestParam(name="boardNo") Long boardNo){
		return ResponseEntity.ok(communityService.findCommunityCommentList(boardNo));
		
	}

	@GetMapping("/count")
	public ResponseEntity<?> commentCount(@RequestParam(name="boardNo") Long boardNo){
		log.info("count : {}", boardNo);
		return ResponseEntity.ok(communityService.commentCount(boardNo));
		
	}
	
	@PutMapping("/comment-update")
	public ResponseEntity<?> updateComment(@Valid @RequestBody CommentDTO comment){
		communityService.updateComment(comment);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
		
	@DeleteMapping("/comment-delete")
	public ResponseEntity<?> deleteComment(@RequestBody Map<String,Long> deleteCommentMap){
		communityService.deleteComment(deleteCommentMap);
		return ResponseEntity.status(HttpStatus.OK).build();
	}


}

	
