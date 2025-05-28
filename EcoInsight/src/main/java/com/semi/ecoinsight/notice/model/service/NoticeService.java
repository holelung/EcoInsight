package com.semi.ecoinsight.notice.model.service;


import java.util.Map;

import com.semi.ecoinsight.admin.model.dto.PageInfo;
import com.semi.ecoinsight.board.model.dto.BoardDTO;

public interface NoticeService {
    
    Map<String, Object> selectNoticeList(PageInfo pageInfo);

    BoardDTO selectNoticeDetail(Long boardNo);
    
}
