package com.semi.ecoinsight.mypage.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ChangePasswordDTO {
    private Long   memberNo;
    private String currentPassword;
    private String newPassword;
}