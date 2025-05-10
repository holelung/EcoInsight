package com.semi.ecoinsight.board.model.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.web.multipart.MultipartFile;

import com.semi.ecoinsight.board.model.vo.PopularPost;

public interface BoardService {
    
    String imageUrlChange(MultipartFile file, String boardType);

    void uploadImage();

    RowBounds setRowBounds(int pageNo, int size);

    void insertViewCount(Long boardNo, String categoryId);
    // auth
    // free
    // qna
    // tips

    Map<String, Map<String, List<PopularPost>>> mainViewCount();
}
