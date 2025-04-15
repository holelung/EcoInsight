import React from "react";
import { Link } from "react-router-dom"; // Link 추가
import "./TipListPage.css";

export default function TipListPage() {
  // 클릭 이벤트 핸들러 함수
  const handleButtonClick = (buttonType) => {
    console.log(`${buttonType} 버튼이 클릭됨!`);
  };

  const handleReportClick = () => {
    console.log("신고하기 버튼 클릭됨!");
    // 여기에 신고 처리 로직 추가 가능
  };

  return (
    <div className="tip-list-page">
      <h1 className="header">팁 게시판</h1>

      {/* Filter and Search */}
      <div className="filter-search">
        <div className="button-group">
          <button
            className="button outline"
            onClick={() => handleButtonClick("전체글")}
          >
            전체글
          </button>
          <button
            className="button outline"
            onClick={() => handleButtonClick("인기글")}
          >
            인기글
          </button>
        </div>
        <div className="search-input-group">
          <input
            placeholder="검색할 내용을 입력해주세요."
            style={{ width: "400px", padding: "8px", fontSize: "16px" }}
            className="input"
          />
          <button className="button" onClick={() => handleButtonClick("검색")}>
            검색
          </button>
          <button
            className="button outline"
            onClick={() => handleButtonClick("글쓰기")}
          >
            글쓰기
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="table-header">
        <div>번호</div>
        <div>작성자</div>
        <div className="col-span-2">제목</div>
        <div>날짜</div>
        <div>조회</div>
      </div>

      {/* Notice Row */}
      <div className="row notice">
        <div>-</div>
        <div className="notice-title">공지사항</div>
        <div className="col-span-2 notice-content">
          중요한 공지는 우선으로 보여집니다. <span className="ml-1">📷</span>
        </div>
        <div>20xx.xx.xx</div>
        <div>1,832</div>
      </div>

      {/* Post Row */}
      <div className="row post">
        <div>01</div>
        <div>누구누구</div>
        <div className="col-span-2 post-content">
          {/* 게시글 제목 클릭 시 상세 페이지 이동 */}
          <Link to="/post/1" className="post-title">
            이벤트는 번호를 생성하여 최신순부터 나열됩니다.
          </Link>
          {/* 신고하기 버튼 */}
          <button className="report-link" onClick={handleReportClick}>
            신고하기
          </button>
        </div>
        <div>20xx.xx.xx</div>
        <div>301</div>
      </div>
    </div>
  );
}
