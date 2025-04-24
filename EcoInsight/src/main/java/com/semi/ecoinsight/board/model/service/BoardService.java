package com.semi.ecoinsight.board.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface BoardService {
    
    List<String> imageUrlChange(MultipartFile files, String boardType);

    void uploadImage();
}
