package com.semi.ecoinsight.admin.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PageInfo {
    private int page;
    private int size;
    private String search;
    private String searchType;
    private String sortOrder;
    private String category;
    private int startIndex;

    public void calStartIndex() {
        this.startIndex = this.page * this.size;
    }
}