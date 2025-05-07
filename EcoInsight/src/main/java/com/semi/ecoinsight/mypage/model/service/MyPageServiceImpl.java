package com.semi.ecoinsight.mypage.model.service;

import java.util.List;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.semi.ecoinsight.auth.model.dao.AuthMapper;
import com.semi.ecoinsight.auth.model.service.AuthService;
import com.semi.ecoinsight.auth.model.service.AuthServiceImpl;
import com.semi.ecoinsight.auth.model.vo.CustomUserDetails;
import com.semi.ecoinsight.member.model.dao.MemberMapper;
import com.semi.ecoinsight.member.model.dto.MemberDTO;
import com.semi.ecoinsight.mypage.model.dao.MyPageMapper;
import com.semi.ecoinsight.mypage.model.dto.ChangePasswordDTO;
import com.semi.ecoinsight.mypage.model.dto.EditProfileDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPageDTO;
import com.semi.ecoinsight.mypage.model.dto.MyPostsDTO;
import com.semi.ecoinsight.token.model.service.TokenService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

	
	private final MyPageMapper myPageMapper; 
	private final AuthService authService;
	private final PasswordEncoder  passwordEncoder;
	
	 @Override
	    public MyPageDTO selectMyPageInfo() {
	        CustomUserDetails user = (CustomUserDetails)
	            SecurityContextHolder.getContext()
	                                 .getAuthentication()
	                                 .getPrincipal();
	        Long memberNo = user.getMemberNo();
	        return myPageMapper.selectMemberInfo(memberNo);
	    }

	 @Override
	 @Transactional
	    public void changePassword(ChangePasswordDTO dto) {
	        CustomUserDetails user = (CustomUserDetails)
	            SecurityContextHolder.getContext()
	                                 .getAuthentication()
	                                 .getPrincipal();
	        
	        dto.setMemberNo(user.getMemberNo());

	        //  현재 비밀번호 조회
	        EditProfileDTO profile =
	            myPageMapper.getMemberByMemberNo(user.getMemberNo());
	        if (!passwordEncoder.matches(
	              dto.getCurrentPassword(),
	              profile.getMemberPw())) {
	            throw new IllegalArgumentException(
	                "현재 비밀번호가 일치하지 않습니다.");
	        }

	        //  새 비밀번호 업데이트
	        dto.setNewPassword(
	            passwordEncoder.encode(dto.getNewPassword()));
	        myPageMapper.updatePassword(dto);
	    }

	 @Override
	    @Transactional
	    public void withdrawal(String currentPassword) {
	        CustomUserDetails user = (CustomUserDetails)
	            SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	        Long memberNo = user.getMemberNo();

	        EditProfileDTO profile = myPageMapper.getMemberByMemberNo(memberNo);
	        if (!passwordEncoder.matches(currentPassword, profile.getMemberPw())) {
	            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
	        }

	        myPageMapper.withdrawalMember(memberNo);
	    }

	@Override
	public void editProfile(EditProfileDTO member) {
		// TODO Auto-generated method stub
		
	}

	@Override
    @Transactional(readOnly = true)
    public List<MyPostsDTO> selectMyPosts() {
        CustomUserDetails user = (CustomUserDetails)
            SecurityContextHolder.getContext()
                                 .getAuthentication()
                                 .getPrincipal();
        return myPageMapper.selectMyPosts(user.getMemberNo());
    }
	
	
	
	
	

}
