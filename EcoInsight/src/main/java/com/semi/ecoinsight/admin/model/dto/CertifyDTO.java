package com.semi.ecoinsight.admin.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CertifyDTO {
    private Long memberNo;
    private Long boardNo;
    private String CategoryId;
    private String point;
}
