package com.semi.ecoinsight.notice.model.service;

import com.semi.ecoinsight.board.model.dto.BoardDTO;

public interface NoticeService {
    
    BoardDTO selectNoticeDetail(Long boardNo);
}
