package com.semi.ecoinsight.admin.model.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.admin.model.dto.BanDTO;
import com.semi.ecoinsight.admin.model.dto.MemberInfoDTO;
import com.semi.ecoinsight.admin.model.dto.PointDTO;
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
    
    // 계정관리
    List<BanDTO> selectAccountList(Map<String, String> pageInfo);
    List<BanDTO> selectAccountListBySearch(Map<String, String> pageInfo);
    
    Long selectAccountCount();
    Long selectAccountCountBySearch(Map<String, String> pageInfo);

    void disableAccount(Long memberNo);
    void enableAccount(Long memberNo);
    
    void insertBanList(BanDTO ban);
    void deleteBanList(Long banNo);
    
    // 포인트관리
    List<MemberInfoDTO> selectPointList(Map<String, String> pageInfo);
    List<MemberInfoDTO> selectPointListBySearch(Map<String, String> pageInfo);
    
    Long selectTotalPoint(Long memberNo);

    void insertPoint(PointDTO point);

    List<PointDTO> selectPointHistoryByMemberNo(Long memberNo);

    // 인증 게시판 관리
    List<BoardDTO> selectAuthBoardList(Map<String, String> pageInfo);
    List<BoardDTO> selectAuthBoardListBySearch(Map<String, String> pageInfo);
    
    Long selectAuthBoardCount();
    Long selectAuthBoardCountBySearch(Map<String, String> pageInfo);
    
    void certifiedAuthBoard(Long boardNo);
    
    void deleteAuthBoard(Long boardNo);
    void restoreAuthBoard(Long boardNo);
}
