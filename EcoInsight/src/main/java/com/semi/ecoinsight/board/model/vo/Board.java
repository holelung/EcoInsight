package com.semi.ecoinsight.board.model.vo;

import java.sql.Date;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Board {
    private Long boardNo;
    private String categoryId;
    private Long memberNo;
    private String boardTitle;
    private String boardContent;
    private Date createdDate;
    private Date modifiedDate;
    private Long viewCount;
    private String isDeleted;
    private Long likeCount;
}
