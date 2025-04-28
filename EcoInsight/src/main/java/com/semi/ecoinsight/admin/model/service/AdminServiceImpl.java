package com.semi.ecoinsight.admin.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.admin.model.dao.AdminMapper;
import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.vo.Attachment;
import com.semi.ecoinsight.board.model.vo.Board;
import com.semi.ecoinsight.notice.model.dao.NoticeMapper;
import com.semi.ecoinsight.util.sanitize.SanitizingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final SanitizingService sanitizingService;
    private final AdminMapper adminMapper;
    private final BoardMapper boardMapper;
    private final NoticeMapper noticeMapper;
    

    @Override
    public void insertNotice(WriteFormDTO form) {
        // 유효성 검증 NotBlank밖에 없음
        
        // XSS 방어
        String sanitizingTitle = sanitizingService.sanitize(form.getTitle());
        String sanitizingContent = sanitizingService.sanitize(form.getContent());

        Board board = Board.builder()
                .memberNo(form.getMemberNo())
                .categoryId(form.getCategoryId())
                .boardTitle(sanitizingTitle)
                .boardContent(sanitizingContent)            
                .build();
        
        adminMapper.insertNotice(board);

        Long noticeNo = noticeMapper.getNoticeNo(form.getMemberNo());
        if (form.getImageUrls() != null) {
            List<Attachment> attachments = form.getImageUrls().stream()
            .map(url -> Attachment.builder()
                .boardNo(noticeNo)
                .AttachmentItem(url)
                .boardType(form.getBoardType())
                .build()
                ).collect(Collectors.toList());
            for (Attachment a : attachments) {
                boardMapper.uploadImage(a);
            }
        }
    }


    @Override
    public List<BoardDTO> selectNoticeList() {

        return null;
    }


    @Override
    public void updateNotice(Long boardNo) {
        
    }


    @Override
    public void deleteNotice(Long boardNo) {
        
    }
    
}
