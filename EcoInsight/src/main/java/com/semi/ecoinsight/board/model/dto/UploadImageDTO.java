package com.semi.ecoinsight.board.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UploadImageDTO {
    private Long noticeAttachmentNo;
    private String noticeAttachmentItem;
    private Long boardNo;
    private String boardType;
}
