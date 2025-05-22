import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";

const NoticeBoard = () => {
  const navi = useNavigate();
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [category, setCategory] = useState("all");
  const [totalPages, setTotalPages] = useState();

  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    axios
      .get(`${API_URL}notice`, {
        params: {
          page: currentPage,
          size: rowsPerPage,
          category: category,
        },
      })
      .then((response) => {
        console.log(response);
        setList([...response.data.boardList]);
        console.log("계산해본다",Math.ceil(response.data.totalCount / rowsPerPage));
        setTotalPages(Math.ceil(response.data.totalCount / rowsPerPage));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, rowsPerPage, category, totalPages]);
  

  const clickCategoryBtn = (item) => {
    setCategory(item);
    setCurrentPage(0);
    console.log(totalPages);
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">공지사항</h1>

      <div className="flex justify-center gap-2 mb-4">
        {["all", "N0001", "N0002", "N0003"].map((item) => (
          <button
            key={item}
            onClick={() => clickCategoryBtn(item)}
            className={`px-4 py-2 rounded-full border ${
              category === item
                ? "bg-black text-white"
                : "bg-gray-100 text-black border-gray-300"
            }`}
          >
            {item === "all"
              ? "전체글"
              : item === "N0001"
              ? "공지사항"
              : item === "N0002"
              ? "업데이트"
              : "버그수정"}
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

      {list.map((post, index) => (
        <div
          key={post.boardNo}
          className="grid grid-cols-6 border-b text-sm py-2 text-center hover:bg-gray-50"
        >
          <div>{list.length - index++}</div>
          <div>
            {post.categoryId === "N0001"
              ? "공지사항"
              : post.categoryId === "N0002"
              ? "업데이트"
              : "버그수정"}
          </div>
          <div
            className="col-span-2 text-left hover:underline cursor-pointer"
            onClick={() => navi(`/notice/detail/${post.boardNo}`)}
          >
            {post.boardTitle}
          </div>
          <div>{post.createdDate}</div>
          <div>{post.viewCount}</div>
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default NoticeBoard;