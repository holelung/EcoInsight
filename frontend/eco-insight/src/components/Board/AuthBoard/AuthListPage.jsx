import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../Pagination/Pagination";

const PAGE_SIZE = 6;

const AuthListPage = () => {
  const navi = useNavigate();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [category, setCategory] = useState("all");
  const [totalPages, setTotalPages] = useState();
  const [listState, setListState] = useState(false);

  useEffect(() => {
    axios.get("http://localhost/auth-boards", {
      params: {
        page: currentPage,
        size: rowsPerPage,
        category: category,
        searchType: searchType,
        search: search,
      },
    }).then((response) => {
      console.log(response);
      setList([...list, ...response.data.boardList]);
      setTotalPages(Math.ceil(response.data.totalCount / rowsPerPage));
    }).catch((error) => {
      console.error(error);
    })
  }, []);


  const handleSearch = () => {
    console.log("검색");
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">인증 게시판</h1>
      <p className="text-center text-gray-600 mt-2">
        인증 게시판에 대한 정보를 담아서 <br /> 두줄로 적어보아요
      </p>

      {/* 카테고리 / 검색 / 글쓰기 버튼 */}
      <div className="flex justify-center mt-6 space-x-2">
        <select
          value={searchType}
          onChange={(e)=> setSearchType(e.target.value)}
          className="border px-2 py-2 rounded text-center"
        >
          <option value="title">제목</option>
          <option value="writer">작성자</option>
          <option value="content">내용</option>
        </select>
        <input
          type="text"
          placeholder="검색할 내용을 입력해주세요."
          className="border px-4 py-2 rounded w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          className="bg-gray-300 px-4 py-2 rounded cursor-pointer hover:border-2 hover:border-lime-400"
          onClick={handleSearch}
        >
          검색
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded cursor-pointer hover:border-2 hover:border-lime-400"
          onClick={() => navi("/auth-board/write")}
        >
          글쓰기
        </button>
      </div>

      {/* 게시글 목록 */}
      <div className="overflow-y-auto mt-8 border rounded-xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map((board) => (
            <div
              key={board.boardNo}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer hover:border-2 hover:border-lime-400"
              onClick={() =>
                navi(`/auth-board/${board.boardNo}`, { state: { post: board } })
              }
            >
              <div className="bg-blue-100 flex items-center justify-center h-40">
                이미지
              </div>
              <div className="px-4 py-2 border-t text-center text-sm text-blue-800 font-semibold">
                {board.boardTitle}
              </div>
              <div className="px-4 py-3 text-sm">
                <div className="flex justify-between mt-1">
                  <span>
                    작성자 :{" "}
                    <span className="text-black-500 font-bold">
                      {board.memberName}
                    </span>
                  </span>
                  <span>작성일 : {board.createdDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AuthListPage;