package com.semi.ecoinsight.util.pagination;

import org.springframework.stereotype.Service;

@Service
public class PaginationService {

    public int getStartIndex(int pageNo, int size) {
        return pageNo * size;
    }
}
