package com.semi.ecoinsight.member.model.service;

import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.member.model.dto.UpdatePasswordDTO;

import jakarta.validation.Valid;

public interface MemberService {
    // 회원가입
    void signUp(MemberDTO member);

	void updatePassword(@Valid UpdatePasswordDTO passwordEntity);
    
    
}
