package com.semi.ecoinsight.community.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
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
	
	@Override
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
            List<Attachment> attachments = form.getImageUrls().stream()
            .map(url -> Attachment.builder()
                .boardNo(communityNo)
                .attachmentItem(url)
                .boardType(form.getBoardType())
                .build()
                ).collect(Collectors.toList());
            for (Attachment a : attachments) {
                boardMapper.uploadImage(a);
            }
        }	
	}
	@Override
	public List<BoardDTO> findAllCommunity(int pageNo, String search, String categoryId) {
		int size = 10;
		
		Map<String,String> searchMap = new HashMap<>();
		searchMap.put("startIndex", Integer.toString(size*pageNo));
		searchMap.put("size", Integer.toString(size));
    	if(search == null) {
    		return communityMapper.findAllCommunity(categoryId);  		
    	} else {   		
    		
   		
    		searchMap.put("search", search);
    		searchMap.put("categoryId", categoryId);
    		
    		return communityMapper.findCommunity(searchMap);
    	}
	}
	@Override
	public Map<String, Object> detailCommunity(Long boardNo, String categoryId) {
		return null;
	}
}
