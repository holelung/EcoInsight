import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import axios from "axios";

const CommunityListPage = () => {
  const { type } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isPopularOnly, setIsPopularOnly] = useState(false);
  const [posts, setPosts] = useState([]);
  const postsPerPage = 10;

  const boardNames = {
    free: "자유게시판",
    qna: "질문 게시판",
    tips: "팁 게시판",
  };
  const boardName = boardNames[type] || "게시판";

  let categoryId = "";
  if (type === "free") categoryId = "C0001";
  else if (type === "qna") categoryId = "C0002";
  else if (type === "tips") categoryId = "C0003";

  const fetchPosts = () => {
    axios
      .get("http://localhost/communities", {
        params: {
          page: currentPage,
          search: searchQuery,
          categoryId: categoryId,
        },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("게시글 가져오기 실패:", error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, type, searchQuery]);

  const handleButtonClick = (buttonType) => {
    setIsPopularOnly(buttonType === "인기글");
    setCurrentPage(0);
    if (buttonType === "전체글") {
      setSearchQuery(""); // 검색어 초기화 → 전체글 보기
    }
  };

  const handleSearchClick = () => {
    setCurrentPage(0);
    fetchPosts();
  };

  const filteredPosts = posts.filter((post) =>
    isPopularOnly ? post.likeCount >= 10 : true
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

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

      {/* 게시글 리스트 */}
      {currentPosts.map((data) => (
        <div
          key={data.boardNo}
          className="grid grid-cols-7 border-b border-gray-200 text-center text-sm py-2 hover:bg-gray-50"
        >
          <div>{data.boardNo}</div>
          <div>{data.memberName}</div>
          <div className="col-span-2 text-left">
            <Link
              to={`/post/${categoryId}/${data.boardNo}`} // ✅ categoryId 추가
              className="text-black hover:underline"
            >
              {data.boardTitle}
            </Link>
          </div>
          <div>{data.createdDate?.substring(0, 10)}</div>
          <div>{data.viewCount || 0}</div>
          <div>{data.likeCount || 0}</div>
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
