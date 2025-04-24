package com.semi.ecoinsight.admin.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.admin.model.dao.AdminMapper;
import com.semi.ecoinsight.admin.model.dto.NoticeDTO;
import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.admin.model.vo.Notice;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.board.model.vo.Attachment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    
    private final AdminMapper adminMapper;
    private final BoardMapper boardMapper;

    @Override
    public void insertNotice(WriteFormDTO form) {
        // 유효성 검증 NotBlank밖에 없음
        Notice notice = Notice.builder()
                .memberNo(form.getMemberNo())
                .noticeTypeNo(form.getNoticeTypeNo())
                .noticeTitle(form.getTitle())
                .noticeContent(form.getContent())            
                .build();
        
        adminMapper.insertNotice(notice);

        Long noticeNo = adminMapper.getNoticeNo(form.getMemberNo());
        
        List<Attachment> Attachments = form.getImageUrls().stream()
            .map(url -> Attachment.builder()
                .boardNo(noticeNo)
                .AttachmentItem(url)
                .boardType(form.getBoardType())
                .build()
                ).collect(Collectors.toList());
        for (Attachment a : Attachments) {
            boardMapper.uploadImage(a);
        }
    }
    
}
