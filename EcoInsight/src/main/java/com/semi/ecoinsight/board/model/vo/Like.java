package com.semi.ecoinsight.board.model.vo;

import java.sql.Date;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Like {
    private Long boardNo;
    private Long memberNo;
    private Date createdDate;
}
