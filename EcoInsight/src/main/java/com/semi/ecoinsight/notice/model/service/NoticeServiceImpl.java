package com.semi.ecoinsight.notice.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.semi.ecoinsight.board.model.dto.BoardDTO;
import com.semi.ecoinsight.board.model.service.BoardService;
import com.semi.ecoinsight.notice.model.dao.NoticeMapper;
import com.semi.ecoinsight.util.pagination.PaginationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService{

    private final NoticeMapper noticeMapper;
    private final PaginationService pagination;
    private final BoardService boardService;

    @Override
    public BoardDTO selectNoticeDetail(Long boardNo) {
        noticeMapper.increaseNoticeViewCount(boardNo);
        return noticeMapper.selectNoticeDetail(boardNo);
    }

    @Override
    public Map<String, Object> selectNoticeList(int pageNo, int size, String category) {
        
        int startIndex = pagination.getStartIndex(pageNo, size);
        Map<String, String> pageInfo = new HashMap<>(); 
        pageInfo.put("startIndex", Integer.toString(startIndex));
        pageInfo.put("size", Integer.toString(size));

        Map<String, Object> resultData = new HashMap<String, Object>();
        

        if (category.equals("all")) {
            Long totalCount = noticeMapper.selectTotalNoticeCount();
            resultData.put("totalCount", totalCount);

            List<BoardDTO> result = noticeMapper.selectNoticeList(pageInfo);
            resultData.put("boardList", result);
            return resultData;
        }
        Long totalCount = noticeMapper.selectNoticeCountByCategoryId(category);
        resultData.put("totalCount", totalCount);

        pageInfo.put("category", category);
        List<BoardDTO> result = noticeMapper.selectNoticeListByCategory(pageInfo);
        resultData.put("boardList", result);
        return resultData;
    }

    
    
    
}
