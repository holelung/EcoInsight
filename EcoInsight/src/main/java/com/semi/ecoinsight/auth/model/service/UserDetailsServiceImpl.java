package com.semi.ecoinsight.auth.model.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.semi.ecoinsight.auth.model.vo.CustomUserDetails;
import com.semi.ecoinsight.member.model.dao.MemberMapper;
import com.semi.ecoinsight.member.model.dto.MemberDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService{

    private final MemberMapper mapper;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MemberDTO member = mapper.getMemberByMemberId(username);
        if(member == null){
            throw new UsernameNotFoundException("존재하지 않는 사용자 입니다.");
        }

        return CustomUserDetails.builder()
                .memberNo(member.getMemberNo())
                .username(member.getMemberId())
                .password(member.getMemberPw())
                .email(member.getEmail())
                .memberRole(member.getMemberRole())
                .memberName(member.getMemberName())
                .isActive(member.getIsActive())
                .authorities(Collections.singletonList(new SimpleGrantedAuthority(member.getMemberRole())))
                .build();
    }

}
