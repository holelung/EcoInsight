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
    public void updatePassword(UpdatePasswordDTO passwordEntity) {
        Long memberNo = passwordMatches(passwordEntity.getCurrentPassword());
        String encodedPassword = passwordEncoder.encode(passwordEntity.getNewPassword());

        Map<String, Object> changeRequest = new HashMap();
        changeRequest.put("memberNo", memberNo);
        changeRequest.put("encodedPassword", encodedPassword);

        mapper.updatePassword(changeRequest);
    }
	private Long passwordMatches(String password){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails user = (CustomUserDetails)auth.getPrincipal();
		if(!passwordEncoder.matches(password, user.getPassword())){
			throw new RuntimeException("비밀번호가 일치하지 않습니다.");
		}
		return user.getMemberNo();
	}
}
