package com.semi.ecoinsight.notice.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.admin.model.dto.PageInfo;
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

    @Override
    public Map<String, Object> selectNoticeList(PageInfo pageInfo) {
        
        pageInfo.calStartIndex();
        
        Map<String, Object> resultData = new HashMap<String, Object>();
        

        resultData.put("totalCount",
                noticeMapper.selectTotalNoticeCount(pageInfo.getCategory()));

        resultData.put("boardList",
                noticeMapper.selectNoticeList(pageInfo));
        
        return resultData;
        
    }

    
    
    
}
