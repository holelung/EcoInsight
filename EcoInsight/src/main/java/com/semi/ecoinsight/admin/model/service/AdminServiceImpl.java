package com.semi.ecoinsight.admin.model.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.semi.ecoinsight.admin.model.dao.AdminMapper;
import com.semi.ecoinsight.admin.model.dto.BanDTO;
import com.semi.ecoinsight.admin.model.dto.CertifyDTO;
import com.semi.ecoinsight.admin.model.dto.PointDTO;
import com.semi.ecoinsight.admin.model.dto.SummaryCardDTO;
import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.service.BoardService;
import com.semi.ecoinsight.board.model.vo.Attachment;
import com.semi.ecoinsight.board.model.vo.Board;
import com.semi.ecoinsight.exception.util.BoardInsertException;
import com.semi.ecoinsight.exception.util.ImageInsertException;
import com.semi.ecoinsight.exception.util.InvalidAccessException;
import com.semi.ecoinsight.exception.util.LargePointValueException;
import com.semi.ecoinsight.notice.model.dao.NoticeMapper;
import com.semi.ecoinsight.util.pagination.PaginationService;
import com.semi.ecoinsight.util.sanitize.SanitizingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
@RequiredArgsConstructor
@EnableTransactionManagement
public class AdminServiceImpl implements AdminService {

    private final SanitizingService sanitizingService;
    private final PaginationService pagination;
    private final BoardService boardService;
    private final AdminMapper adminMapper;
    private final BoardMapper boardMapper;
    private final NoticeMapper noticeMapper;

    @Transactional
    @Override
    public void insertNotice(WriteFormDTO form) {
        // 유효성 검증 NotBlank밖에 없음

        // XSS 방어

        Board board = boardBuilder(form);

        try {
            adminMapper.insertNotice(board);
        } catch (RuntimeException e) {
            throw new BoardInsertException("게시글 생성에 실패했습니다.");
            // uploads에 저장한 파일 삭제 로직 필요
        }

        // 신규 BoardNo 불러오기
        form.setBoardNo(noticeMapper.selectNoticeNo(form.getMemberNo()));

        if (form.getImageUrls() != null) {
            List<Attachment> attachments = attachmentsBuilder(form);
            for (Attachment a : attachments) {
                try {
                    boardMapper.uploadImage(a);
                } catch (RuntimeException e) {
                    //uploads에 저장한 파일도 제거해야함
                    throw new ImageInsertException("이미지 업로드에 실패했습니다.");
                }
            }
        }
    }

    /**
     * 관리자페이지용 공지사항 리스트 호출서비스<br>
     * @param pageNo        호출한 페이지 번호
     * @param size          한 페이지에 보여줄 게시글 개수
     * @param search        검색어
     * @param searchType    검색 타입 정의
     * @param sortOrder     오름차순/내림차순 정의
     */
    @Override
    public Map<String, Object> selectNoticeListForAdmin(int pageNo, int size, String search, String searchType,
            String sortOrder) {

        int startIndex = pagination.getStartIndex(pageNo, size);
        Map<String, String> pageInfo = new HashMap<>();
        pageInfo.put("startIndex", Integer.toString(startIndex));
        pageInfo.put("size", Integer.toString(size));
        pageInfo.put("sortOrder", sortOrder);

        Map<String, Object> resultData = new HashMap<String, Object>();

        if (search.isEmpty()) {
            resultData.put("totalCount", noticeMapper.selectTotalNoticeCountForAdmin());
            // 10개만 나옴
            resultData.put("boardList", noticeMapper.selectNoticeListForAdmin(pageInfo));
            return resultData;
        }
        pageInfo.put("search", search);
        pageInfo.put("searchType", searchType);

        resultData.put("totalCount", noticeMapper.selectNoticeCountBySearch(pageInfo));
        resultData.put("boardList", noticeMapper.selectSearchedNoticeListForAdmin(pageInfo));
        return resultData;
    }

    // 게시글 수정
    @Transactional
    @Override
    public void updateNotice(WriteFormDTO form) {
        Board board = boardBuilder(form);
        log.info("수정할 board정보 잘왓나 확인:{}", board);
        try {
            adminMapper.updateNotice(board);
        } catch (RuntimeException e) {
            throw new BoardInsertException("게시글 수정에 실패했습니다.");
        }

        if (form.getImageUrls() != null) {
            List<Attachment> attachments = attachmentsBuilder(form);
            for (Attachment a : attachments) {
                try {
                    boardMapper.uploadImage(a);
                } catch (RuntimeException e) {
                    //uploads에 저장한 파일도 제거해야함
                    throw new ImageInsertException("추가 이미지 업로드에 실패했습니다.");
                }
            }
        }

    }

    @Override
    public void deleteNotice(Long boardNo) {
        if (boardNo < 1) {
            throw new InvalidAccessException("잘못된 접근입니다.");
        }
        adminMapper.deleteNotice(boardNo);
    }

    @Override
    public void restoreNotice(Long boardNo) {
        if (boardNo < 1) {
            throw new InvalidAccessException("잘못된 접근입니다.");
        }
        adminMapper.restoreNotice(boardNo);
    }

    private Board boardBuilder(WriteFormDTO form) {
        return Board.builder()
                .boardNo(form.getBoardNo())
                .memberNo(form.getMemberNo())
                .categoryId(form.getCategoryId())
                .boardTitle(form.getTitle())
                .boardContent(form.getContent())
                .build();
    }

    private List<Attachment> attachmentsBuilder(WriteFormDTO form) {
        return form.getImageUrls().stream()
                .map(url -> Attachment.builder()
                        .boardNo(form.getBoardNo())
                        .attachmentItem(url)
                        .boardType(form.getBoardType())
                        .build())
                .collect(Collectors.toList());
    }

    // summaryCard
    @Override
    public List<SummaryCardDTO> selectNoticeSummaryCards() {
        List<SummaryCardDTO> cards = new ArrayList<>();
        Long totalCount = noticeMapper.selectTotalNoticeCount();
        Long currentMonthCount = noticeMapper.selectTotalNoticeCountByMonth();

        Long noticeIncrease = ((long) Math.floor((double) currentMonthCount / (totalCount - currentMonthCount) * 100));

        cards.add(
                new SummaryCardDTO("전체 공지사항 수", totalCount, noticeIncrease, noticeIncrease > 0 ? true : false));

        Long lastMonthCount = noticeMapper.selectTotalNoticeCountByLastMonth();
        Long noticeIncreaseIndividual = (long) Math.floor((double) currentMonthCount / lastMonthCount * 100);
        cards.add(
                new SummaryCardDTO("이번달 공지사항 수", currentMonthCount, noticeIncreaseIndividual,
                        noticeIncreaseIndividual > 0 ? true : false));

        Long totalViewCount = noticeMapper.selectTotalViewCount();
        cards.add(
                new SummaryCardDTO("전체 조회수", totalViewCount, 0l, true));
        return cards;
    }

    @Override
    public List<SummaryCardDTO> selectCommunitySummaryCards() {

        throw new UnsupportedOperationException("Unimplemented method 'selectCommunitySummaryCards'");
    }

    @Override
    public List<SummaryCardDTO> selectAuthBoardSummaryCards() {

        throw new UnsupportedOperationException("Unimplemented method 'selectAuthBoardSummaryCards'");
    }

    @Override
    public List<SummaryCardDTO> selectAccountSummaryCards() {

        throw new UnsupportedOperationException("Unimplemented method 'selectAccountSummaryCards'");
    }

    @Override
    public List<SummaryCardDTO> selectPointSummaryCards() {

        throw new UnsupportedOperationException("Unimplemented method 'selectPointSummaryCards'");
    }

    // Community 관련
    @Override
    public Map<String, Object> selectCommunityForAdmin(int pageNo, int size, String search, String searchType,
            String sortOrder) {
        int startIndex = pagination.getStartIndex(pageNo, size);
        Map<String, String> pageInfo = new HashMap<>();
        pageInfo.put("startIndex", Integer.toString(startIndex));
        pageInfo.put("size", Integer.toString(size));
        pageInfo.put("sortOrder", sortOrder);

        Map<String, Object> resultData = new HashMap<String, Object>();

        if (search.isEmpty()) {
            resultData.put("totalCount", adminMapper.selectCommunityCount());
            // 10개만 나옴
            resultData.put("boardList", adminMapper.selectCommunityListForAdmin(pageInfo));
            return resultData;
        }
        pageInfo.put("search", search);
        pageInfo.put("searchType", searchType);

        resultData.put("totalCount", adminMapper.selectCommunityCountBySearch(pageInfo));
        resultData.put("boardList", adminMapper.selectCommunityListForAdminBySearch(pageInfo));
        return resultData;
    }

    @Override
    public void deleteCommunity(Long boardNo) {
        if (boardNo < 1) {
            throw new InvalidAccessException("잘못된 접근입니다.");
        }
        adminMapper.deleteCommunity(boardNo);
    }

    @Override
    public void restoreCommunity(Long boardNo) {
        if (boardNo < 1) {
            throw new InvalidAccessException("잘못된 접근입니다.");
        }
        adminMapper.restoreCommunity(boardNo);
    }

    @Override
    public Map<String, Object> selectAccountList(int pageNo, int size, String search, String searchType,
            String sortOrder) {

        int startIndex = pagination.getStartIndex(pageNo, size);
        Map<String, String> pageInfo = new HashMap<>();
        pageInfo.put("startIndex", Integer.toString(startIndex));
        pageInfo.put("size", Integer.toString(size));
        pageInfo.put("sortOrder", sortOrder);

        Map<String, Object> resultData = new HashMap<String, Object>();

        if (search.isEmpty()) {
            resultData.put("totalCount", adminMapper.selectAccountCount());
            // 10개만 나옴
            resultData.put("memberList", adminMapper.selectAccountList(pageInfo));
            return resultData;
        }
        pageInfo.put("search", search);
        pageInfo.put("searchType", searchType);

        resultData.put("totalCount", adminMapper.selectAccountCountBySearch(pageInfo));
        resultData.put("memberList", adminMapper.selectAccountListBySearch(pageInfo));
        return resultData;
    }

    @Transactional
    @Override
    public void disableAccount(BanDTO banInfo) {

        // banList table에 추가
        try {
            adminMapper.insertBanList(banInfo);
        } catch (RuntimeException e) {
            throw new RuntimeException("BanList에 추가 실패", e);
        }
        // isActive = 'N' 으로 변경
        try {
            adminMapper.disableAccount(banInfo.getMemberNo());
        } catch (RuntimeException e) {
            throw new RuntimeException("계정 상태 변경 실패", e);
        }
    }

    @Override
    public void enableAccount(Long memberNo) {
        // banList table에서 삭제
        try {
            adminMapper.deleteBanList(memberNo);
        } catch (RuntimeException e) {
            throw new RuntimeException("BanList에서 삭제 실패");
        }
        // isActive = 'Y' 으로 변경
        try {
            adminMapper.enableAccount(memberNo);
        } catch (RuntimeException e) {
            throw new RuntimeException("계정 상태 변경 실패");
        }
    }

    // 포인트관리 
    @Override
    public Map<String, Object> selectPointList(int pageNo, int size, String search, String searchType,
            String sortOrder) {

        int startIndex = pagination.getStartIndex(pageNo, size);
        Map<String, String> pageInfo = new HashMap<>();
        pageInfo.put("startIndex", Integer.toString(startIndex));
        pageInfo.put("size", Integer.toString(size));
        pageInfo.put("sortOrder", sortOrder);

        Map<String, Object> resultData = new HashMap<String, Object>();

        if (search.isEmpty()) {
            resultData.put("totalCount", adminMapper.selectAccountCount());
            // 10개만 나옴
            resultData.put("memberList", adminMapper.selectPointList(pageInfo));
            
            return resultData;
        }
        pageInfo.put("search", search);
        pageInfo.put("searchType", searchType);

        resultData.put("totalCount", adminMapper.selectAccountCountBySearch(pageInfo));
        resultData.put("memberList", adminMapper.selectPointListBySearch(pageInfo));
        return resultData;
    }

    @Override
    public void insertPoint(PointDTO point) {
        if (Math.abs(point.getChangePoint()) > 100000l) {
            throw new LargePointValueException("값이 너무 크거나 작습니다.(최대 +-10만)");
        }
        if (point.getMemberNo() < 1) {
            throw new InvalidAccessException("잘못된 접근입니다.");
        }

        adminMapper.insertPoint(point);
        
    }

    @Transactional
    @Override
    public Map<String, Object> selectPointDetail(Long memberNo) {
        if (memberNo < 1) {
            throw new InvalidAccessException("잘못된 접근입니다.");
        }
        
        Map<String, Object> resultMap = new HashMap<>();

        try{
            resultMap.put("history", adminMapper.selectPointHistoryByMemberNo(memberNo));
        } catch (Exception e) {
            throw new RuntimeException("기록 불러오기 실패");
        }
        
        try{
            resultMap.put("totalPoint", adminMapper.selectTotalPoint(memberNo));
        } catch (Exception e) {
            throw new RuntimeException("합계 포인트 조회 실패");
        }

        return resultMap;
    }

    // 인증 게시판 조회~
    @Override
    public Map<String, Object> selectAuthBoardList(int pageNo, int size, String search, String searchType,
            String sortOrder) {
        
        int startIndex = pagination.getStartIndex(pageNo, size);
        Map<String, String> pageInfo = new HashMap<>();
        pageInfo.put("startIndex", Integer.toString(startIndex));
        pageInfo.put("size", Integer.toString(size));
        pageInfo.put("sortOrder", sortOrder);

        Map<String, Object> resultData = new HashMap<String, Object>();

        if (search.isEmpty()) {
            resultData.put("totalCount", adminMapper.selectAuthBoardCount());
            // 10개만 나옴
            resultData.put("boardList", adminMapper.selectAuthBoardList(pageInfo));
            return resultData;
        }
        pageInfo.put("search", search);
        pageInfo.put("searchType", searchType);

        resultData.put("totalCount", adminMapper.selectAuthBoardCountBySearch(pageInfo));
        resultData.put("boardList", adminMapper.selectAuthBoardListBySearch(pageInfo));
        return resultData;
    }

    @Override
    public void handleCertify(CertifyDTO certify) {

        String temp = adminMapper.selectIsCertifiedByBoardNo(certify.getBoardNo());
        PointDTO point = new PointDTO();
        Long changePoint = pointChoice(certify.getCategoryId());
        
        point.setMemberNo(certify.getMemberNo());
        if (temp.equals("Y")) {
            adminMapper.uncertifiedAuthBoard(certify);
            point.setChangePoint(changePoint * -1);
            adminMapper.insertPoint(point);
        } else {
            adminMapper.certifiedAuthBoard(certify);
            point.setChangePoint(changePoint);
            adminMapper.insertPoint(point);
        }
    }

    @Override
    public void deleteAuthBoard(Long boardNo) {
        
        if (boardNo < 1l) {
            throw new InvalidAccessException("잘못된 접근");
        }
        adminMapper.deleteAuthBoard(boardNo);
    }

    @Override
    public void restoreAuthBoard(Long boardNo) {
        if (boardNo < 1l) {
            throw new InvalidAccessException("잘못된 접근");
        }
        adminMapper.restoreAuthBoard(boardNo);
        
    }

    private Long pointChoice(String categoryId) {
        switch (categoryId) {
            case "A0001":
                return 1000l;
            case "A0002":
                return 2000l;
            case "A0003":
                return 3000l;
            default:
                throw new InvalidAccessException("잘못된 접근입니다.");
                
        }
    }
}
