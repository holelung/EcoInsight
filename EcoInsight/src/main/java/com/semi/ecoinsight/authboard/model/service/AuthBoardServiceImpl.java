package com.semi.ecoinsight.authboard.model.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.auth.model.vo.CustomUserDetails;
import com.semi.ecoinsight.authboard.model.dao.AuthBoardMapper;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.vo.Attachment;
import com.semi.ecoinsight.board.model.vo.Board;
import com.semi.ecoinsight.util.sanitize.SanitizingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthBoardServiceImpl implements AuthBoardService {
	private final SanitizingService sanitizingService;
	private final AuthBoardMapper authBoardMapper;
	private final BoardMapper boardMapper;
	
	
	@Override
	public Long uploadAuthBoard(WriteFormDTO form){
		log.info("!@#%___{}__!@#$%",form);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      	CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

		// XSS 방어(유효성)
        String sanitizingTitle = sanitizingService.sanitize(form.getTitle());
        String sanitizingContent = sanitizingService.sanitize(form.getContent());
		Board board = Board.builder()
			.memberNo(user.getMemberNo())
			.categoryId(form.getCategoryId())
			.boardTitle(sanitizingTitle)
			.boardContent(sanitizingContent)            
			.build();
		authBoardMapper.uploadAuthBoard(board);

		Long boardNo = authBoardMapper.getAuthBoardNo(form.getMemberNo());
		if (form.getImageUrls() != null) {
            List<Attachment> attachments = form.getImageUrls().stream()
            .map(url -> Attachment.builder()
                .boardNo(boardNo)
                .attachmentItem(url)
                .boardType(form.getBoardType())
                .build()
                ).collect(Collectors.toList());
            for (Attachment a : attachments) {
                boardMapper.uploadImage(a);
            }
        }	
		return boardNo;
	}
	
	@Override
	public void deleteAuthBoard(Long boardNo) {
		authBoardMapper.deleteAuthBoard(boardNo);
	}
	
	public BoardDTO getAuthBoardDetail(Long boardNo) {
	    return authBoardMapper.selectAuthBoardById(boardNo);
	}
	
	public void updateAuthBoard(Long boardNo, WriteFormDTO form) {
	    String sanitizingTitle = sanitizingService.sanitize(form.getTitle());
	    String sanitizingContent = sanitizingService.sanitize(form.getContent());
	    Board board = Board.builder()
	            .boardNo(boardNo)
	            .boardTitle(sanitizingTitle)
	            .boardContent(sanitizingContent)
	            .build();
	    authBoardMapper.updateAuthBoard(board);
	}

	@Override
	public List<BoardDTO> getAllAuthBoards() {
	    return authBoardMapper.selectAuthBoardList();
	}
}