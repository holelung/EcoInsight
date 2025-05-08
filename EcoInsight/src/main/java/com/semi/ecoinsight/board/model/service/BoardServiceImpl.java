package com.semi.ecoinsight.board.model.service;


import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.security.access.AccessDeniedException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.semi.ecoinsight.auth.model.service.AuthService;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.util.file.service.FileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    
    private final BoardMapper boardMapper;
    private final AuthService authService;
    private final FileService fileService;

    @Override
    public void uploadImage() {

        throw new UnsupportedOperationException("Unimplemented method 'uploadImage'");
    }

    @Override
    public String imageUrlChange(MultipartFile file, String boardType) {
        if ("notice".equals(boardType) && !authService.isAdmin()) {
            throw new AccessDeniedException("관리자 권한이 필요합니다.");
        }
        
        return fileService.store(file);
    }

    @Override
    public RowBounds setRowBounds(int pageNo, int size) {
        return new RowBounds(pageNo * size, size);
    }
    
    @Override
    public void insertViewCount(Long boardNo, String categoryId){
        Map<String, Object> viewCountEntity = new HashMap<String, Object>();
        boardMapper.insertViewCount(viewCountEntity);
    }
    
}
