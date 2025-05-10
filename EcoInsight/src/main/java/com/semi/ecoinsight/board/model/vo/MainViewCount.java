package com.semi.ecoinsight.board.model.vo;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class MainViewCount {
    Long boardNo;
    String categoryId;
}
