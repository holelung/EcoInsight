package com.semi.ecoinsight.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.member.model.vo.Member;

@Mapper
public interface MemberMapper {
    MemberDTO getMemberByMemberId(String MemberId);

    int signUp(Member member);
}
