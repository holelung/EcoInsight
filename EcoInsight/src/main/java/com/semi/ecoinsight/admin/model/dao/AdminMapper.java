package com.semi.ecoinsight.admin.model.dao;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.semi.ecoinsight.admin.model.dto.BanDTO;
import com.semi.ecoinsight.admin.model.dto.CertifyDTO;
import com.semi.ecoinsight.admin.model.dto.MemberInfoDTO;
import com.semi.ecoinsight.admin.model.dto.PageInfo;
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
    List<BoardDTO> selectCommunityListForAdmin(PageInfo pageInfo);
    
    Long selectCommunityCount(PageInfo pageInfo);
    
    void deleteCommunity(Long boardNo);
    void restoreCommunity(Long boardNo);
    

    // 계정관리
    List<BanDTO> selectAccountList(PageInfo pageInfo);
    Long selectAccountCount(PageInfo pageInfo);
    
    void disableAccount(Long memberNo);
    void enableAccount(Long memberNo);
    
    void insertBanList(BanDTO ban);
    void deleteBanList(Long banNo);
    
    // 포인트관리
    List<MemberInfoDTO> selectPointList(PageInfo pageInfo);
    
    Long selectTotalPoint(Long memberNo);

    void insertPoint(PointDTO point);

    List<PointDTO> selectPointHistoryByMemberNo(Long memberNo);

    // 인증 게시판 관리
    List<BoardDTO> selectAuthBoardList(PageInfo pageInfo);
    
    Long selectAuthBoardCount();
    
    // 인증게시글 인증 처리
    void certifiedAuthBoard(CertifyDTO dto);
    void uncertifiedAuthBoard(CertifyDTO dto);
    String selectIsCertifiedByBoardNo(Long boardNo);

    // 인증게시글 삭제/복원
    void deleteAuthBoard(Long boardNo);
    void restoreAuthBoard(Long boardNo);
}
