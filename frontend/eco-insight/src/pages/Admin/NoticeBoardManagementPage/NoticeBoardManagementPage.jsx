import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import SummaryCard from "../../../components/DashBoard/SummaryCard";
import { authBoardList } from "../data";

import Pagination from "../../../components/Pagination/Pagination";
import Select from "../../../components/Input/Select/Select";
import SelectRowNumber from "../../../components/Input/Select/SelectRowNumber";
import Search from "../../../components/Input/Search/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../components/Context/AuthContext";


const NoticeBoardManagementPage = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const [list, setList] = useState(authBoardList);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedItemId, setSelectedItemId] = useState(null);


  useEffect(() => {
    axios.get("http://localhost/admin/notice", {
      params: {
        page: currentPage,
        size: rowsPerPage,
        search: search,
        sortOrder: sortOrder,
      }, 
        headers: {
          Authorization: `Bearer ${auth.tokens.accessToken}`,
      }
    }).then((response) => {
      console.log(response);
      setList([...response.data]);
      
    }).catch(error => {
      console.log(error);
    })
  },[currentPage, rowsPerPage, search, sortOrder])

  const currentList = useMemo(() => {
     const startIndex = currentPage * rowsPerPage;
    return list.slice(startIndex, startIndex + rowsPerPage);
  }, [list, currentPage, rowsPerPage]);
  const totalPages = Math.ceil(list.length / rowsPerPage);

  const handleData = (data, status) => {
    if (status === "Y") {
      status = "Disable";
    } else {
      status = "Active";
    }
    alert(`${data}번 글의 상태가 ${status}로 변경되었습니다.`);

    setSelectedItemId(null);
  };

  const handleSelectitemTable = (itemId) => {
    if (selectedItemId == itemId) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(itemId);
    }
  };

  

  return (
    <div className="p-6 space-y-6">
      {/* 상단 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          icon="👥"
          title="포인트 보유 유지"
          value="5,423"
          change="+16%"
          positive
        />
        <SummaryCard
          icon="🚮"
          title="포인트 사용량"
          value="1,893"
          change="-1%"
          positive={false}
        />
        <SummaryCard
          icon="💻"
          title="포인트 획득 유지"
          value="189"
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
          type={"memberPointList"}
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
          <button
            className="px-3 py-2 bg-lime-400 rounded"
            onClick={()=> navi('/admin/notice-write')}
          >
            글쓰기
          </button>
        </div>
      </div>

      {/* 사용자 테이블 */}
      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden text-sm shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">글번호</th>
            <th>카테고리</th>
            <th>글쓴이</th>
            <th>제목</th>
            <th>조회수</th>
            <th>업로드일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, i) => (
            <Fragment key={item.boardNo}>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{i++}</td>
                {/* <td>{item.boardCategory}</td> */}
                <td>카테고리</td>
                <td>{item.memberName}</td>
                <td>{item.boardTitle}</td>
                <td>{item.viewCount}</td>
                <td>{item.createdDate}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      item.status === "Y"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                    onClick={() => handleSelectitemTable(item.boardNo)}
                  >
                    {item.status === "Y" ? "Active" : "Disable"}
                  </span>
                </td>
              </tr>
              {selectedItemId === item.boardNo && (
                <tr className="bg-gray-50">
                  <td colSpan={7} className="px-4 py-3">
                    <div className="flex gap-2 items-center justify-end">
                      <span className="text-sm font-medium">
                        {item.boardNo} 상태 변경
                      </span>
                      <input
                        type="text"
                        value={item.status === "Y" ? "Active" : "Disable"}
                        className="border px-3 py-2 w-32 rounded"
                        placeholder="상태변경"
                        disabled
                      />
                      <button
                        className="bg-black text-white px-4 py-2 rounded"
                        onClick={() => handleData(item.boardNo, item.status)}
                      >
                        상태변경
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
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

export default NoticeBoardManagementPage;
