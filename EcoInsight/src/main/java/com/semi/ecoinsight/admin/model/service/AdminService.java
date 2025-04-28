package com.semi.ecoinsight.admin.model.service;


import java.util.List;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dto.BoardDTO;


public interface AdminService {
    
    // 공지사항 작성
    void insertNotice(WriteFormDTO form);
    // 공지사항 목록 조회(관리자)
    List<BoardDTO> selectNoticeList();
    // 공지사항 수정 관리
    void updateNotice(Long boardNo);
    // 공지사항 삭제?
    void deleteNotice(Long boardNo);
}
