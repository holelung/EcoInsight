package com.semi.ecoinsight.mypage.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EditProfileDTO {
    private Long memberNo;

    // 기존 멤버Pw
    private String memberPw;

    // 입력한 현재 비밀번호
    @NotBlank(message = "현재 비밀번호를 입력해주세요.")
    private String currentPassword;

    @NotBlank(message = "이름을 입력해주세요.")
    private String memberName;

    @NotBlank(message = "전화번호를 입력해주세요.")
    private String memberPh;

    @NotBlank(message = "이메일을 입력해주세요.")
    private String email;
}
