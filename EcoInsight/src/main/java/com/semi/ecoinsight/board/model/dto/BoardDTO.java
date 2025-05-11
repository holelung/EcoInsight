package com.semi.ecoinsight.board.model.dto;

import java.sql.Date;

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
public class BoardDTO {
    
    private Long boardNo;
    private String categoryId;
    @NotBlank
    private Long memberNo;
    @NotBlank
    private String boardTitle;
    @NotBlank
    private String boardContent;
    private Date createdDate;
    private Date modifiedDate;
    private Long viewCount;
    private String isDeleted;
    private String isCertified;
    // 조회용
    private String memberId;
    private String memberName;
    // 좋아요 수
    private Long likeCount;
    // 이미지 URL
    private String imageUrl;
}
