package com.semi.ecoinsight.community.model.service;

import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;

public interface CommunityService {
	
	// 글 작성
	void insertCommunityBoard(WriteFormDTO form);
}
