package com.semi.ecoinsight.admin.model.service;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.admin.model.dao.AdminMapper;
import com.semi.ecoinsight.admin.model.dto.NoticeDTO;
import com.semi.ecoinsight.admin.model.dto.UploadFileDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    
    private final AdminMapper adminMapper;

    @Override
    public void insertNotice(NoticeDTO notice) {
        throw new UnsupportedOperationException("Unimplemented method 'insertNotice'");
    }
    
}
