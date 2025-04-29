package com.semi.ecoinsight.mypage.model.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.semi.ecoinsight.auth.model.dao.AuthMapper;
import com.semi.ecoinsight.auth.model.service.AuthService;
import com.semi.ecoinsight.auth.model.service.AuthServiceImpl;
import com.semi.ecoinsight.auth.model.vo.CustomUserDetails;
import com.semi.ecoinsight.member.model.dao.MemberMapper;
import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.mypage.model.dao.MyPageMapper;
import com.semi.ecoinsight.mypage.model.dto.EditProfileDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPageDTO;
import com.semi.ecoinsight.token.model.service.TokenService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

	
	private final MyPageMapper myPageMapper; 
	private final AuthService authService;
	
	@Override
	public MyPageDTO selectMyPageInfo() {
		 CustomUserDetails user = authService.getUserDetails();
		 user.getMemberNo();
		return null;
	}

	@Override
	public void editProfile(EditProfileDTO member) {
		CustomUserDetails user = authService.getUserDetails();
		EditProfileDTO member = new EditProfileDTO();
		member.setEmail(user.getEmail());
		member.setMemberPh(memberPh);
		user.getMemberNo();
		
		
		
	}

	@Override
	public void withdrawal(String memberPw) {
		 CustomUserDetails user = authService.getUserDetails();
		 MemberDTO member = new MemberDTO();
		 member.setMemberId(user.getUsername());
		 member.setMemberPw(memberPw);
		 authService.login(member);
		 
		 myPageMapper.withdrawalMember(user.getMemberNo());
		 
		 
		 
	}

}
