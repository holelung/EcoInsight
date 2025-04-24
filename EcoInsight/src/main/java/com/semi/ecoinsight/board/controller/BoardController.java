package com.semi.ecoinsight.board.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.semi.ecoinsight.board.model.service.BoardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@RestController()
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {
    
    private final BoardService boardService;
    
    @PostMapping("upload")
    public ResponseEntity<?> uploadImage(
        @RequestParam(name="files", required=true) MultipartFile files, @RequestParam(name="boardType", required=true) String boardType) {
        
        log.info("file:{}", files);
        // List<String> uploadPath = boardService.imageUrlChange();
        return null;
        // return ResponseEntity.ok(uploadPath);
    }
    
}
