package com.semi.ecoinsight.notice.model.service;

import java.util.List;
import java.util.Map;

import com.semi.ecoinsight.board.model.dto.BoardDTO;

public interface NoticeService {
    
    Map<String, Object> selectNoticeList(int pageNo, int size, String category);

    BoardDTO selectNoticeDetail(Long boardNo);
    
}
