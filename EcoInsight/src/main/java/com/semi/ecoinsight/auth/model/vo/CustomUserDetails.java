package com.semi.ecoinsight.auth.model.vo;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.Value;

@Value
@Builder
@Getter
@ToString
public class CustomUserDetails implements UserDetails{
    private final Long memberNo;
    private final String username; //MEMBER_ID
    private final String password; //MEMBER_PW
    private final String email;
    private final String memberRole;        
    private final String memberName;
    private final char isActive;
    private final Collection<? extends GrantedAuthority> authorities;
}
