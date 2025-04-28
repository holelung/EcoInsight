package com.semi.ecoinsight.authboard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.authboard.model.dto.AuthBoardDTO;
import com.semi.ecoinsight.authboard.model.vo.AuthBoard;

@Mapper
public interface AuthBoardMapper {
	void insertAuthBoard(AuthBoard authBoard);
	List<AuthBoardDTO> selectCommentList(Long boardNo);
}
