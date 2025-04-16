package com.semi.ecoinsight.member.model.service;

import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.member.model.dto.UpdatePasswordDTO;

public interface MemberService {
    // 회원가입
    void signUp(MemberDTO member);
    
    // 비밀번호 변경
    void updatePassword(UpdatePasswordDTO passwordEntity);
}
