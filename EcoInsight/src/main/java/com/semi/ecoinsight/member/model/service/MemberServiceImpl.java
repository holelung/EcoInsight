package com.semi.ecoinsight.member.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.semi.ecoinsight.auth.model.vo.CustomUserDetails;
import com.semi.ecoinsight.exception.util.MemberIdDuplicateException;
import com.semi.ecoinsight.member.model.dao.MemberMapper;
import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.member.model.dto.UpdatePasswordDTO;
import com.semi.ecoinsight.member.model.vo.Member;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberMapper mapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void signUp(MemberDTO member) {
        MemberDTO searchedMember = mapper.getMemberByMemberId(member.getMemberId());
        MemberDTO searchedMemberEmail = mapper.getMemberByEmail(member.getEmail());
        if(searchedMember != null || searchedMemberEmail != null){
            throw new MemberIdDuplicateException("이미 가입된 아이디입니다.");
        }
        
        Member memberValue = Member.builder()
                                   .memberName(member.getMemberName())
                                   .memberPw(passwordEncoder.encode(member.getMemberPw())) // 패스워드 인코딩 
                                   .memberId(member.getMemberId())
                                   .email(member.getEmail())
                                   .memberPh(member.getMemberPh())
                                   .memberRole("ROLE_COMMON")
                                   .build();
        mapper.signUp(memberValue);
    }

	@Override
	public void updatePassword(@Valid UpdatePasswordDTO passwordEntity) {
		// TODO Auto-generated method stub
		
	}

   
}
