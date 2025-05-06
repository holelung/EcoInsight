package com.semi.ecoinsight.admin.model.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.vo.Board;




@Mapper
public interface AdminMapper {
    
    // 공지사항 관리
    void insertNotice(Board board);

    void updateNotice(Board board);

    void deleteNotice(Long boardNo);
    
    void restoreNotice(Long boardNo);

    // 커뮤니티 관리
    List<BoardDTO> selectCommunityListForAdmin(Map<String, String> pageInfo);
    List<BoardDTO> selectCommunityListForAdminBySearch(Map<String, String> pageInfo);

    Long selectCommunityCount();
    Long selectCommunityCountBySearch(Map<String, String> pageInfo);
    
    void deleteCommunity(Long boardNo);
    void restoreCommunity(Long boardNo);
}
