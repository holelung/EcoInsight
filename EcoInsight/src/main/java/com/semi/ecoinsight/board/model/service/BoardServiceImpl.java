package com.semi.ecoinsight.board.model.service;


import java.util.Collection;
import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.semi.ecoinsight.auth.model.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    
    private final AuthService authService;

    @Override
    public void uploadImage() {

        throw new UnsupportedOperationException("Unimplemented method 'uploadImage'");
    }

    @Override
    public List<String> imageUrlChange(MultipartFile files, String boardType) {
        if ("notice".equals(boardType) && !authService.isAdmin()) {
            throw new AccessDeniedException("관리자 권한이 필요합니다.");
        }

        
        return null;
    }
    
    
    
}
