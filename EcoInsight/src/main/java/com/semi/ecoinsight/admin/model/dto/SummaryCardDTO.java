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
public class SummaryCardDTO {
    String title;
    Long value;
    Long change;
    boolean status;
}
