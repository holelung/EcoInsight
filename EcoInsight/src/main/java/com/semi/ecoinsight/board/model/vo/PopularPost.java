package com.semi.ecoinsight.board.model.vo;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PopularPost {
    String boardGroup;   // "A" = 인증, "C" = 커뮤니티
    String categoryId;   // A0001, C0003 …
    String categoryName; // 질문 게시판, 자유 게시판 …
    Long   boardNo;
    String boardTitle;
    String memberName;
    Long   viewCnt;
}
