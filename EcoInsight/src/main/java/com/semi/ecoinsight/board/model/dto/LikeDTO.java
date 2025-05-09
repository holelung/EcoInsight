package com.semi.ecoinsight.board.model.dto;

import java.sql.Date;

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
public class LikeDTO {
    private Long boardNo;
    private Long memberNo;
    private Date createdDate;    
}
