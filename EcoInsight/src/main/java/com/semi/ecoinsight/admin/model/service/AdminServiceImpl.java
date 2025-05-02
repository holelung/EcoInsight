package com.semi.ecoinsight.admin.model.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
        
        Board board = Board.builder()
                .memberNo(form.getMemberNo())
                .categoryId(form.getCategoryId())
                .boardTitle(form.getTitle())
                .boardContent(form.getContent())            
                .build();
        try {
            adminMapper.insertNotice(board);
        } catch (RuntimeException e) {
            throw new BoardInsertException("게시글 생성에 실패했습니다.");
        }
        

        Long boardNo = noticeMapper.getNoticeNo(form.getMemberNo());
        if (form.getImageUrls() != null) {
            List<Attachment> attachments = form.getImageUrls().stream()
            .map(url -> Attachment.builder()
                .boardNo(boardNo)
                .attachmentItem(url)
                .boardType(form.getBoardType())
                .build()
                ).collect(Collectors.toList());
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


    @Override
    public void updateNotice(Long boardNo) {
        
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
    
}
