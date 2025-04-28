package com.semi.ecoinsight.community.model.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.board.model.vo.Attachment;
import com.semi.ecoinsight.board.model.vo.Board;
import com.semi.ecoinsight.community.model.dao.CommunityMapper;
import com.semi.ecoinsight.util.sanitize.SanitizingService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService{
	
	private final SanitizingService sanitizingService;
	private final CommunityMapper communityMapper;
	private final BoardMapper boardMapper;
	
	public void insertCommunityBoard(WriteFormDTO form) {
		// XSS 방어(유효성)
        String sanitizingTitle = sanitizingService.sanitize(form.getTitle());
        String sanitizingContent = sanitizingService.sanitize(form.getContent());
        
        Board board = Board.builder()
                .memberNo(form.getMemberNo())
                .categoryId(form.getCategoryId())
                .boardTitle(sanitizingTitle)
                .boardContent(sanitizingContent)            
                .build();
        
        communityMapper.insertCommunityBoard(board);
        
        Long communityNo = communityMapper.getCommunityNo(form.getMemberNo());
        if (form.getImageUrls() != null) {
            List<Attachment> Attachments = form.getImageUrls().stream()
            .map(url -> Attachment.builder()
                .boardNo(communityNo)
                .AttachmentItem(url)
                .boardType(form.getBoardType())
                .build()
                ).collect(Collectors.toList());
            for (Attachment a : Attachments) {
                boardMapper.uploadImage(a);
            }
        }
        
        
	}
}
