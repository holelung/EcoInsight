package com.semi.ecoinsight.board.model.vo;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Attachment {
    private Long boardNo;
    private String attachmentItem;
    private String boardType;
}
