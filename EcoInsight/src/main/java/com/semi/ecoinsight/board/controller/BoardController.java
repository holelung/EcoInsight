package com.semi.ecoinsight.board.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.semi.ecoinsight.board.model.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@RestController()
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {
    
    private final BoardService boardService;
    
    @PostMapping("upload")
    public ResponseEntity<?> imageUrlChange(
            @RequestParam(name = "files", required = false) List<MultipartFile> files,
            @RequestParam(name="boardType", required=false) String boardType) {
        if (files == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        log.info("file개수:{}", files.size());
        List<String> uploadPath = new ArrayList<>();
        for (MultipartFile file : files) {
            uploadPath.add(boardService.imageUrlChange(file, boardType));
        }
        return ResponseEntity.ok(uploadPath);
    }

    @GetMapping("mainview-count")
    public ResponseEntity<?> mainViewCount(){
        return ResponseEntity.ok(boardService.mainViewCount());
    }
}
