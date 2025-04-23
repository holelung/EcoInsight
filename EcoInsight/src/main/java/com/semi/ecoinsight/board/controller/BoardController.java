package com.semi.ecoinsight.board.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController()
@RequestMapping("/boards")
public class BoardController {
    
    @PostMapping("upload")
    public String uploadImage(@RequestBody String entity) {
        //TODO: process POST request
        
        return entity;
    }
    
}
