package com.semi.ecoinsight.mypage.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyAuthPostsDTO {
    private Long    boardNo;
    private String  boardTitle;
    private String  categoryName;
    private String  createdDate;
    private Long viewCount;
}
