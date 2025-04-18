package com.semi.ecoinsight.member.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UpdatePasswordDTO {
    
    @Size(min = 8, message="비밀번호 최소 8자 이상, 적어도 하나의 영문자와 하나의 숫자 포함")
    @NotBlank(message = "기존 비밀번호를 입력해주세요.")
    private String currentPassword;

    @Size(min = 8, message="비밀번호 최소 8자 이상, 적어도 하나의 영문자와 하나의 숫자 포함")
    @NotBlank(message = "변경할 비밀번호를 입력해주세요.")
    private String newPassword;
}
