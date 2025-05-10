package com.semi.ecoinsight.board.model.service;


import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.ibatis.session.RowBounds;
import org.springframework.security.access.AccessDeniedException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.semi.ecoinsight.auth.model.service.AuthService;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.board.model.vo.MainViewCount;
import com.semi.ecoinsight.board.model.vo.PopularPost;
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
        MainViewCount mainViewCount = MainViewCount.builder().boardNo(boardNo).categoryId(categoryId).build();
        log.info("{}",mainViewCount);
        boardMapper.insertViewCount(mainViewCount);
    }

    @Override
    public Map<String, Map<String, List<PopularPost>>> mainViewCount() {
        List<PopularPost> list = boardMapper.selectDailyPopularPosts();

        // 1) boardGroup(A/C) → 2) categoryName → List<PopularPost>
        return list.stream()
                   .collect(Collectors.groupingBy(
                        PopularPost::getBoardGroup,
                        LinkedHashMap::new,
                        Collectors.groupingBy(
                            PopularPost::getCategoryName,
                            LinkedHashMap::new,
                            Collectors.toList()
                        )));
    }
}
