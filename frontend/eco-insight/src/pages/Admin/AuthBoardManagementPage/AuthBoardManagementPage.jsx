import { useContext, useEffect, useMemo, useState } from "react";
import SummaryCard from "../../../components/DashBoard/SummaryCard";

import DOMpurify from "dompurify";
import { authBoardList } from "../data";
import { AuthContext } from "../../../components/Context/AuthContext";
import Pagination from "../../../components/Pagination/Pagination";
import SelectRowNumber from "../../../components/Input/Select/SelectRowNumber";
import Search from "../../../components/Input/Search/Search";
import Select from "../../../components/Input/Select/Select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthBoardDetail from "../../../components/Board/AuthBoard/AuthBoardDetail";
import AuthBoardDetailModal from "./AuthBoardDetailModal";


const AuthBoardManagementPage = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const [list, setList] = useState(authBoardList);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedBoardNo, setSelectedBoardNo] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [listState, setListState] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalBoardNo, setModalBoardNo] = useState();

  useEffect(() => {
    if (auth.tokens.accessToken) {
      axios
        .get("http://localhost/admin/authboard", {
          params: {
            page: currentPage,
            size: rowsPerPage,
            search: search,
            searchType: searchType,
            sortOrder: sortOrder,
          },
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          setList([...response.data.boardList]);
          setTotalPages(Math.ceil(response.data.totalCount / rowsPerPage));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentPage, rowsPerPage, sortOrder, listState, auth.tokens.accessToken]);


  const handleAuthBoard = (memberName) => {
    alert(`${memberName} 님의 게시글이 활성 되었습니다.`);
    
    setSelectedBoardNo(null);
  };

  const handleIsDeletedTable = (boardNo) => {
    if (selectedBoardNo == boardNo) {
      setSelectedBoardNo(null);
    } else {
      setSelectedBoardNo(boardNo);
    }
  };

  const handleOpenDetail = (boardNo) => {
    setModalBoardNo(boardNo);
    setModalIsOpen(true);
  }
  const handleCloseDetail = () => {
    setModalIsOpen(false);
  }

  const handleSearch = () => {
    setListState(!listState);
  }

  return (
    <div className="p-6 space-y-6">
      {/* 상단 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          icon="👥"
          title="인증 게시글 수"
          value="5,430"
          change="+20%"
          positive
        />
        <SummaryCard
          icon="🚮"
          title="전달 대비증가량"
          value="-33"
          change="-2%"
          positive={false}
        />
        <SummaryCard
          icon="💻"
          title="처리할 인증 게시글"
          value="139"
          change="+3%"
          positive
        />
      </div>

      {/* 검색창 + 정렬 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-0.5">
          <Select
            selectValue={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
            }}
          >
            <option value="name">글쓴이</option>
            <option value="title">제목</option>
            <option value="all">글쓴이+제목</option>
          </Select>
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => handleSearch()}
            type={"memberPointList"}
          />
        </div>
        <div className="flex items-center gap-4">
          <Select
            selectValue={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            labelName={"행 개수"}
          >
            <SelectRowNumber />
          </Select>
          <Select
            selectValue={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            labelName={"정렬"}
          >
            <option value="Newest">최신순</option>
            <option value="Oldest">오래된순</option>
          </Select>
        </div>
      </div>

      {/* 사용자 테이블 */}
      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden text-sm shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">아이디</th>
            <th>글 번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>조회수</th>
            <th>좋아요 수</th>
            <th>업로드일</th>
            <th>처리여부</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {list.map((board) => (
            <>
              <tr key={board.boardNo} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{board.memberId}</td>
                <td>{board.boardNo}</td>
                <td>{board.boardTitle}</td>
                <td>{board.boardContent?.replace(/<[^>]*>/g, "")}</td>
                <td>{board.viewCount}</td>
                <td>{board.likeCount}</td>
                <td>{board.createdDate}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      board.isCertified === "Y"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                    onClick={() => handleOpenDetail(board.boardNo)}
                  >
                    {board.isCertified === "Y" ? `Complete` : "Require"}
                  </span>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      board.isDeleted === "N"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                    onClick={() => handleIsDeletedTable(board.boardNo)}
                  >
                    {board.isDeleted === "N" ? `Active` : "Disable"}
                  </span>
                </td>
              </tr>
              {selectedBoardNo === board.boardNo && (
                <tr className="bg-gray-50">
                  <td colSpan={9} className="px-4 py-3">
                    <div className="flex gap-2 items-center justify-end">
                      <span className="text-sm font-medium flex ">
                        <p className="font-bold pr-1">{board.memberName}</p>
                        회원의 게시글 인증처리자
                      </span>
                      {/* value = {auth.loginInfo.memberName} 으로 변경해야함 */}
                      <input
                        type="text"
                        // value={auth.memberInfo.memberName}
                        value="관리자명"
                        className="border px-3 py-2 w-32 rounded"
                      />
                      <button
                        className="bg-black text-white px-4 py-2 rounded"
                        onClick={() => handleAuthBoard(board.memberName)}
                      >
                        {board.isDeleted === "N" ? "삭제하기" : "복원하기"}
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <AuthBoardDetailModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseDetail}
        boardNo={modalBoardNo}
        listState={listState}
        setListState={setListState}
      />
    </div>
  );
};

export default AuthBoardManagementPage;
