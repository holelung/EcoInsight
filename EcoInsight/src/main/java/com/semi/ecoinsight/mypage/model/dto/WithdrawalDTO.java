package com.semi.ecoinsight.mypage.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WithdrawalDTO {
    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String currentPassword;
}