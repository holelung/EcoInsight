package com.semi.ecoinsight.token.model.vo;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Tokens {
    private String refreshToken;
    private String accessToken;
}
