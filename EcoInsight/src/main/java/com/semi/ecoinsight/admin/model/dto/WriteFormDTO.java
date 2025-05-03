package com.semi.ecoinsight.admin.model.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
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
public class WriteFormDTO {
    
    private Long boardNo;
    private Long memberNo;
    @NotBlank
    private String categoryId;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotBlank
    private String boardType;
    private List<String> imageUrls;
}
