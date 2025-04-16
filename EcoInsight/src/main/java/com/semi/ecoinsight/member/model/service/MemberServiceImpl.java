package com.semi.ecoinsight.member.model.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.semi.ecoinsight.exception.util.MemberIdDuplicateException;
import com.semi.ecoinsight.member.model.dao.MemberMapper;
import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.member.model.vo.Member;

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
        if(searchedMember != null){
            throw new MemberIdDuplicateException("이미 가입된 아이디입니다.");
        }
        
        Member memberValue = Member.builder()
                                   .memberName(member.getMemberName())
                                   .memberPw(passwordEncoder.encode(member.getMemberPw()))
                                   .memberId(member.getMemberId())
                                   .email(member.getEmail())
                                   .memberPh(member.getMemberPh())
                                   .memberSsn(member.getMemberSsn())
                                   .memberRole("ROLE_COMMON")
                                   .build();
        log.info("----------------------------------------------- {}",member);
        log.info("------------------------------------------------- {}",memberValue);
        mapper.signUp(memberValue);
    }

    @Override
    public void changePassword() {
        throw new UnsupportedOperationException("Unimplemented method 'changePassword'");
    }

}
