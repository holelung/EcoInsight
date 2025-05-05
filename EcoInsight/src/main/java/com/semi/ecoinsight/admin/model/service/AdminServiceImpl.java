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
import com.semi.ecoinsight.admin.model.dto.WriteFormDTO;
import com.semi.ecoinsight.board.model.dao.BoardMapper;
import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.service.BoardService;
import com.semi.ecoinsight.board.model.vo.Attachment;
import com.semi.ecoinsight.board.model.vo.Board;
import com.semi.ecoinsight.exception.util.BoardInsertException;
import com.semi.ecoinsight.exception.util.ImageInsertException;
import com.semi.ecoinsight.exception.util.InvalidAccessException;
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
        form.setBoardNo(noticeMapper.getNoticeNo(form.getMemberNo()));
        
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
    public Map<String, Object> selectNoticeListForAdmin(int pageNo, int size, String search, String searchType, String sortOrder) {
        
        int startIndex = pagination.getStartIndex(pageNo, size);
        Map<String, String> pageInfo = new HashMap<>(); 
        pageInfo.put("startIndex", Integer.toString(startIndex));
        pageInfo.put("size", Integer.toString(size));
        if (sortOrder.equals("Newest")) {
            pageInfo.put("sortOrder", "DESC");    
        } else {
            pageInfo.put("sortOrder", "ASC");
        }
        

        Map<String, Object> resultData = new HashMap<String, Object>();
        
        if (search.isEmpty()) {
            resultData.put("totalCount", noticeMapper.getTotalNoticeCountForAdmin());
            // 10개만 나옴
            resultData.put("boardList", noticeMapper.selectNoticeListForAdmin(pageInfo));
            return resultData;
        }
        pageInfo.put("search", search);
        pageInfo.put("searchType", searchType);

        resultData.put("totalCount", noticeMapper.getNoticeCountBySearch(pageInfo));
        resultData.put("boardList", noticeMapper.selectSearchedNoticeListForAdmin(pageInfo));
        return resultData;
    }

    // 게시글 수정
    @Transactional
    @Override
    public void updateNotice(WriteFormDTO form) {
        Board board = boardBuilder(form);
        log.info("수정할 board정보 잘왓나 확인:{}",board);
        try{
            adminMapper.updateNotice(board);
        }catch(RuntimeException e){
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
                            .build()
                        ).collect(Collectors.toList());
    }
}
