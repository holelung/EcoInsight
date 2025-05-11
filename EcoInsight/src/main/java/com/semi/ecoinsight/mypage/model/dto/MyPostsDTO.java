package com.semi.ecoinsight.mypage.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor
public class MyPostsDTO {
    private Long    boardNo;
    private String  boardTitle;
    private String  categoryName;
    private String  createdDate;  
    private String    categoryId;
    private Integer viewCount;
}