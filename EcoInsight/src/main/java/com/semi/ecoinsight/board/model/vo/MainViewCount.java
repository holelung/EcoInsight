package com.semi.ecoinsight.board.model.vo;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class MainViewCount {
    String categoryId;
    Long boardNo;
    Long viewCnt;
}
