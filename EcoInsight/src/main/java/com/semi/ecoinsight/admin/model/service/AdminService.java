package com.semi.ecoinsight.admin.model.service;

import com.semi.ecoinsight.admin.model.dto.NoticeDTO;
import com.semi.ecoinsight.admin.model.dto.UploadFileDTO;

public interface AdminService {
    
    // 글작성
    void insertNotice(NoticeDTO notice);
}
