package com.semi.ecoinsight.board.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface BoardService {
    
    String imageUrlChange(MultipartFile file, String boardType);

    void uploadImage();
}
