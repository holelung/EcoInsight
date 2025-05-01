package com.semi.ecoinsight.board.model.service;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.web.multipart.MultipartFile;

public interface BoardService {
    
    String imageUrlChange(MultipartFile file, String boardType);

    void uploadImage();

    RowBounds setRowBounds(int pageNo, int size);
}
