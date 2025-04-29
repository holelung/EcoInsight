import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import axios from "axios";

const datas = [
  {
    id: 1,
    title: "첫 번째 게시글 제목",
    username: "admin01",
    date: "2025-04-15",
    content: "이것은 첫 번째 게시글 내용입니다.",
    views: 3,
    likes: 8,
  },
  {
    id: 2,
    title: "두 번째 게시글 제목",
    username: "사용자2",
    date: "2025-04-14",
    content: "이것은 두 번째 게시글 내용입니다.",
    views: 1,
    likes: 18,
  },
  {
    id: 3,
    title: "자유 게시판 글 작성해요",
    username: "사용자3",
    date: "2025-04-13",
    content: "자유 게시판에 작성한 글입니다.",
    views: 5,
    likes: 2,
  },
  {
    id: 4,
    title: "팁 게시판을 잘 활용하기",
    username: "사용자4",
    date: "2025-04-12",
    content: "이 게시글에서는 팁 게시판을 잘 활용하는 방법에 대해 다룹니다.",
    views: 2,
    likes: 11,
  },
  {
    id: 5,
    title: "인증 게시판 사용 방법",
    username: "사용자5",
    date: "2025-04-11",
    content: "인증 게시판을 어떻게 사용하는지 설명하는 글입니다.",
    views: 0,
    likes: 10,
  },
  {
    id: 6,
    title: "자유롭게 이야기 나누는 게시판",
    username: "사용자6",
    date: "2025-04-10",
    content: "여기서는 자유롭게 이야기를 나눌 수 있습니다.",
    views: 4,
    likes: 6,
  },
  {
    id: 7,
    title: "개발 관련 팁 공유",
    username: "사용자7",
    date: "2025-04-09",
    content: "개발에 유용한 팁들을 공유하는 게시글입니다.",
    views: 6,
    likes: 20,
  },
  {
    id: 8,
    title: "인증 게시판 참여 방법",
    username: "사용자8",
    date: "2025-04-08",
    content: "인증 게시판에 참여하는 방법에 대해 다룹니다.",
    views: 2,
    likes: 0,
  },
  {
    id: 9,
    title: "질문 게시판에 질문하기",
    username: "사용자9",
    date: "2025-04-07",
    content: "질문 게시판에 올릴 수 있는 질문들에 대해 설명합니다.",
    views: 3,
    likes: 14,
  },
  {
    id: 10,
    title: "자유게시판에 글 남기기",
    username: "사용자10",
    date: "2025-04-06",
    content: "자유게시판에 글을 남기는 방법에 대한 팁을 제공합니다.",
    views: 0,
    likes: 17,
  },
  {
    id: 11,
    title: "리액트 프로젝트 질문",
    username: "사용자11",
    date: "2025-04-05",
    content: "리액트 프로젝트에 대한 질문을 올려봅니다.",
    views: 2,
    likes: 19,
  },
  {
    id: 12,
    title: "인증 게시판을 활용하는 방법",
    username: "사용자12",
    date: "2025-04-04",
    content: "인증 게시판을 어떻게 잘 활용할 수 있는지 설명합니다.",
    views: 1,
    likes: 10,
  },
  {
    id: 13,
    title: "팁 게시판에 유용한 정보 올리기",
    username: "사용자13",
    date: "2025-04-03",
    content: "팁 게시판에 올릴 수 있는 유용한 정보들을 소개합니다.",
    views: 3,
    likes: 13,
  },
  {
    id: 14,
    title: "개발자 팁과 트릭",
    username: "사용자14",
    date: "2025-04-02",
    content: "개발자가 알아두면 유용한 팁과 트릭을 공유합니다.",
    views: 0,
    likes: 1,
  },
  {
    id: 15,
    title: "자유게시판에서 대화하기",
    username: "사용자15",
    date: "2025-04-01",
    content: "자유게시판에서 어떤 주제로 대화할지에 대해 이야기합니다.",
    views: 5,
    likes: 2,
  },
  {
    id: 16,
    title: "인증 게시판 글 작성하기",
    username: "사용자16",
    date: "2025-03-31",
    content: "인증 게시판에 글을 작성하는 방법에 대해 설명합니다.",
    views: 2,
    likes: 3,
  },
  {
    id: 17,
    title: "리액트로 웹 애플리케이션 만들기",
    username: "사용자17",
    date: "2025-03-30",
    content: "리액트로 웹 애플리케이션을 만드는 방법을 소개합니다.",
    views: 4,
    likes: 6,
  },
  {
    id: 18,
    title: "질문 게시판에 질문 작성하기",
    username: "사용자18",
    date: "2025-03-29",
    content: "질문 게시판에 질문을 작성하는 방법에 대해 다룹니다.",
    views: 3,
    likes: 8,
  },
  {
    id: 19,
    title: "개발 팁: 코드 최적화 방법",
    username: "사용자19",
    date: "2025-03-28",
    content: "개발 과정에서 코드 최적화 방법을 다룹니다.",
    views: 2,
    likes: 4,
  },
  {
    id: 20,
    title: "리액트 최적화 팁",
    username: "사용자20",
    date: "2025-03-27",
    content: "리액트 애플리케이션을 최적화하는 팁을 공유합니다.",
    views: 1,
    likes: 7,
  },
];

const CommunityListPage = () => {
  const { type } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // 0-based index
  const [isPopularOnly, setIsPopularOnly] = useState(false);
  const postsPerPage = 10;

  const boardNames = {
    free: "자유게시판",
    qna: "질문 게시판",
    tips: "팁 게시판",
  };

  const boardName = boardNames[type] || "게시판";

  const handleButtonClick = (buttonType) => {
    if (buttonType === "전체글") {
      setIsPopularOnly(false);
    } else if (buttonType === "인기글") {
      setIsPopularOnly(true);
    }
    setCurrentPage(0);
  };

  const handleSearchClick = () => {
    setCurrentPage(0);
    console.log(`검색어: ${searchQuery}`);
  };

  // 검색 적용
  const filteredPosts = datas
    .filter((post) => post.title.includes(searchQuery))
    .filter((post) => (isPopularOnly ? post.likes >= 10 : true));

  // 페이지 계산
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(typeof page === "function" ? page(currentPage) : page);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">{boardName}</h1>

      {/* 필터 + 검색 */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 border rounded ${
              !isPopularOnly ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => handleButtonClick("전체글")}
          >
            전체글
          </button>

          <button
            className={`px-4 py-2 border rounded ${
              isPopularOnly ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => handleButtonClick("인기글")}
          >
            인기글
          </button>
        </div>

        <div className="flex gap-2">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색할 내용을 입력해주세요."
            className="w-[400px] px-4 py-2 border border-gray-300 rounded text-base"
          />
          <button
            className="px-4 py-2 rounded border border-black bg-white text-black"
            onClick={handleSearchClick}
          >
            검색
          </button>
          <Link
            to={`/write/${type}`}
            className="px-4 py-2 border border-gray-300 rounded bg-transparent text-black"
          >
            글쓰기
          </Link>
        </div>
      </div>

      {/* 테이블 헤더 */}
      <div className="grid grid-cols-7 py-2 text-sm font-semibold text-center border-y border-gray-200">
        <div>번호</div>
        <div>작성자</div>
        <div className="col-span-2">제목</div>
        <div>날짜</div>
        <div>조회수</div>
        <div>좋아요</div>
      </div>

      {/* 공지사항 */}
      <div className="grid grid-cols-7 py-2 text-sm font-semibold text-green-500 border-b border-gray-200">
        <div>-</div>
        <div className="text-green-500 font-semibold">공지사항</div>
        <div className="col-span-2 text-left font-bold">
          중요한 공지는 우선으로 보여집니다. <span className="ml-1"></span>
        </div>
        <div>20xx.xx.xx</div>
        <div>1,832</div>
      </div>

      {/* 게시글 리스트 */}
      {currentPosts.map((data) => (
        <div
          key={data.id}
          className="grid grid-cols-7 border-b border-gray-200 text-center text-sm py-2 hover:bg-gray-50"
        >
          <div>{data.id}</div>
          <div>{data.username}</div>
          <div className="col-span-2 text-left">
            <Link
              to={`/post/${data.id}`}
              className="text-black hover:underline"
            >
              {data.title}
            </Link>
          </div>
          <div>{data.date}</div>
          <div>{data.views}</div>
          <div>{data.likes}</div>
        </div>
      ))}

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CommunityListPage;
