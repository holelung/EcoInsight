package com.semi.ecoinsight.token.model.vo;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class RefreshToken {
    private Long memberNo;
    private String refreshToken;
    private LocalDateTime expiredDate;
}
