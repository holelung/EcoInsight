package com.semi.ecoinsight.admin.model.service;


import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;


public interface AdminService {
    
    // 글작성
    void insertNotice(WriteFormDTO form);
}
