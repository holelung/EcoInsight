import { useContext, useMemo, useState } from "react";
import SummaryCard from "../../../components/DashBoard/SummaryCard";

import { authBoardList } from "../data";
import { AuthContext } from "../../../components/Context/AuthContext";
import Pagination from "../../../components/Pagination/Pagination";
import SelectRowNumber from "../../../components/Input/Select/SelectRowNumber";
import Search from "../../../components/Input/Search/Search";
import Select from "../../../components/Input/Select/Select";


const AuthBoardManagementPage = () => {
  const { auth } = useContext(AuthContext);
  const [list, setList] = useState(authBoardList);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedBoardNo, setSelectedBoardNo] = useState(null);

  const filteredList = list
    .filter((board) =>
      [board.memberName, board.memberId, board.title].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "Newest") return b.id - a.id;
      if (sortOrder === "Oldest") return a.id - b.id;
      return 0;
    });

    const currentList = useMemo(() => {
      const startIndex = currentPage * rowsPerPage;
      return filteredList.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredList, currentPage, rowsPerPage]); 
    const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  const handleAuthBoard = (memberName) => {
    alert(`${memberName} 님의 게시글이 인증처리 되었습니다.`);
    
    setSelectedBoardNo(null);
  };

  const handleSelectBoardTable = (boardNo) => {
    if (selectedBoardNo == boardNo) {
      setSelectedBoardNo(null);
    } else {
      setSelectedBoardNo(boardNo);
    }
  };

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
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          searchResult={setList}
          type={"AuthBoardList"}
        />
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
            <th>업로드일</th>
            <th>처리여부</th>
          </tr>
        </thead>
        <tbody>
          {currentList.map((board) => (
            <>
              <tr key={board.boardNo} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{board.memberId}</td>
                <td>{board.boardNo}</td>
                <td>{board.title}</td>
                <td>{board.content}</td>
                <td>{board.createdDate}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      board.status === "Y"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                    onClick={() => handleSelectBoardTable(board.boardNo)}
                  >
                    {board.status === "Y" ? `Complete` : "Require"}
                  </span>
                </td>
              </tr>
              {selectedBoardNo === board.boardNo && (
                <tr className="bg-gray-50">
                  <td colSpan={6} className="px-4 py-3">
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
                        인증하기
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
    </div>
  );
};

export default AuthBoardManagementPage;
