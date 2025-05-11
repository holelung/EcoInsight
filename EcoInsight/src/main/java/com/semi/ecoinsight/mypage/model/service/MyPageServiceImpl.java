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
import com.semi.ecoinsight.mypage.model.dto.MyAuthPostsDTO;
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
	        // 1) 현재 로그인된 사용자 정보
	        CustomUserDetails user = (CustomUserDetails)
	            SecurityContextHolder.getContext()
	                                 .getAuthentication()
	                                 .getPrincipal();

	        // 2) 입력한 아이디가 본인 것인지 확인
	        if (!user.getUsername().equals(dto.getMemberId())) {
	            throw new IllegalArgumentException("입력한 아이디가 로그인 계정과 일치하지 않습니다.");
	        }

	        // 3) 새 비밀번호 일치 여부 확인
	        if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
	            throw new IllegalArgumentException("새 비밀번호가 서로 일치하지 않습니다.");
	        }

	        // 4) 암호화 후 DB 업데이트
	        String encoded = passwordEncoder.encode(dto.getNewPassword());
	        myPageMapper.updatePasswordByMemberId(dto.getMemberId(), encoded);
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
	    public EditProfileDTO getEditProfileInfo() {
	        CustomUserDetails user = (CustomUserDetails)
	            SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	        EditProfileDTO dto = myPageMapper.getMemberByMemberNo(user.getMemberNo());
	        // 폼에 비밀번호 표시하지 않도록 빈 문자열 세팅
	        dto.setMemberPw("");
	        return dto;
	    }

	    @Override
	    @Transactional
	    public void editProfile(EditProfileDTO dto) {
	        CustomUserDetails user = (CustomUserDetails)
	            SecurityContextHolder.getContext().getAuthentication().getPrincipal();

	        EditProfileDTO profile = myPageMapper.getMemberByMemberNo(user.getMemberNo());

	        if (!passwordEncoder.matches(
	                dto.getCurrentPassword(),
	                profile.getMemberPw()
	        )) {
	            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
	        }

	        dto.setMemberNo(user.getMemberNo());
	        myPageMapper.editMyProfile(dto);
	    }

	@Override
    public List<MyPostsDTO> selectMyPosts() {
        CustomUserDetails user = (CustomUserDetails)
            SecurityContextHolder.getContext()
                                 .getAuthentication()
                                 .getPrincipal();
        return myPageMapper.selectMyPosts(user.getMemberNo());
    }
	
	
	
	@Override
    public List<MyAuthPostsDTO> selectMyAuthPosts() {
        CustomUserDetails user = (CustomUserDetails)
            SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return myPageMapper.selectMyAuthPosts(user.getMemberNo());
    }
	
	
	

}
