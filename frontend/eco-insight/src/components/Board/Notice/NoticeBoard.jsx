import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const datas = [
  {
    id: 0,
    type: "notice",
    title: "중요한 공지는 우선으로 보여집니다.",
    username: "admin01",
    date: "20xx.xx.xx",
    views: 1832,
  },
  {
    id: 1,
    type: "event",
    title: "이벤트는 번호를 생성하여 최신순부터 나열합니다.",
    username: "admin01",
    date: "20xx.xx.xx",
    views: 301,
  },
  {
    id: 2,
    type: "normal",
    title: "일반 게시글입니다.",
    username: "user1",
    date: "2025-04-01",
    views: 25,
  },
];

const NoticeBoard = () => {
  const { type } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const postsPerPage = 10;

  const handleSearchClick = () => {
    setCurrentPage(1);
  };

  const handlePostClick = (postId) => {
    const index = datas.findIndex((post) => post.id === postId);
    if (index !== -1) {
      datas[index].views += 1;
    }
  };

  const filtered = datas.filter((post) => {
    if (filterType === "all") return true;
    return post.type === filterType;
  });

  const filteredPosts = filtered.filter((post) =>
    post.title.includes(searchQuery)
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">공지사항</h1>

      <div className="flex justify-center gap-2 mb-4">
        {["all", "notice", "event"].map((btn) => (
          <button
            key={btn}
            onClick={() => setFilterType(btn)}
            className={`px-4 py-2 rounded-full border ${
              filterType === btn
                ? "bg-black text-white"
                : "bg-gray-100 text-black border-gray-300"
            }`}
          >
            {btn === "all"
              ? "전체글"
              : btn === "notice"
              ? "공지사항"
              : "이벤트"}
          </button>
        ))}
      </div>

      {/* 테이블 헤더 */}
      <div className="grid grid-cols-6 border-y font-semibold text-sm py-2 text-center">
        <div>번호</div>
        <div>분류</div>
        <div className="col-span-2">제목</div>
        <div>날짜</div>
        <div>조회</div>
      </div>

      {currentPosts.map((post, index) => (
        <div
          key={post.id}
          className="grid grid-cols-6 border-b text-sm py-2 text-center hover:bg-gray-50"
        >
          <div>
            {post.type === "notice" ? "-" : String(index + 1).padStart(2, "0")}
          </div>
          <div className={post.type === "notice" ? "text-green-500" : ""}>
            {post.type === "notice"
              ? "공지사항"
              : post.type === "event"
              ? "이벤트"
              : "일반"}
          </div>
          <div className="col-span-2 text-left">
            <Link
              to={`/board/notice/${post.id}`}
              state={{ postType: post.type }}
              onClick={() => handlePostClick(post.id)}
              className="hover:underline"
            >
              {post.title} {post.type === "notice" && <span>📷</span>}
            </Link>
          </div>
          <div>{post.date}</div>
          <div>{post.views}</div>
        </div>
      ))}

      <div className="flex justify-center mt-6 gap-2">
        {Array.from(
          { length: Math.ceil(filteredPosts.length / postsPerPage) },
          (_, i) => i + 1
        ).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded border ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
