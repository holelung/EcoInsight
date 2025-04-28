package com.semi.ecoinsight.member.model.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.member.model.vo.Member;

@Mapper
public interface MemberMapper {
    MemberDTO getMemberByMemberId(String memberId);
    MemberDTO getMemberByEmail(String email);
    int signUp(Member member);

    void updatePassword(Map<String, Object> passwordEntity);

}
