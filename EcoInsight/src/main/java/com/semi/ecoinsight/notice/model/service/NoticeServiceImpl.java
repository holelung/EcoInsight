package com.semi.ecoinsight.notice.model.service;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.notice.model.dao.NoticeMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService{

    private final NoticeMapper noticeMapper;

    @Override
    public BoardDTO selectNoticeDetail(Long boardNo) {
        noticeMapper.increaseNoticeViewCount(boardNo);
        return noticeMapper.selectNoticeDetail(boardNo);
    }
    
    
}
