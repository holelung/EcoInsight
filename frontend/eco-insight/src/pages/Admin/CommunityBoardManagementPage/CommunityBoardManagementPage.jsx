import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import SummaryCard from "../../../components/DashBoard/SummaryCard";

import Pagination from "../../../components/Pagination/Pagination";
import Select from "../../../components/Input/Select/Select";
import SelectRowNumber from "../../../components/Input/Select/SelectRowNumber";
import Search from "../../../components/Input/Search/Search";
import { AuthContext } from "../../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CommunityBoardManagementPage = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [listState, setListState] = useState(false);

  const API_URL = window.ENV?.API_URL;

  useEffect(() => {
    if (auth.tokens.accessToken) {
      axios.get(`${API_URL}admin/community`, {
        params: {
          page: currentPage,
          size: rowsPerPage,
          search: search,
          searchType: searchType,
          sortOrder: sortOrder,
        },
        headers: {
          Authorization: `Bearer ${auth.tokens.accessToken}`,
        }
      }).then(response => {
        console.log(response);
        setList([...response.data.boardList]);
        setTotalPages(Math.ceil(response.data.totalCount / rowsPerPage));
      }).catch(error => {
        console.error(error);
      });
    }
  }, [currentPage, rowsPerPage, sortOrder, listState, auth.tokens.accessToken]);

  
  const handleData = (boardNo, isDeleted) => {
    if (isDeleted === "N") {
      axios
        .delete(`${API_URL}admin/community`, {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
          params: {
            boardNo: boardNo,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            alert(response.data);
            setListState(!listState);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .patch(
          `${API_URL}admin/community/restore`,
          {
            boardNo: boardNo,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.tokens.accessToken}`,
            },
          }
        )
        .then((response) => {
          alert(response.data);
          setListState(!listState);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setSelectedItemId(null);
  };
  
  const handleSelectitemTable = (itemId) => {
    if (selectedItemId == itemId) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(itemId);
    }
  };
  
  const handleSearch = () => {
    setListState(!listState);
  }
  
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
              setCurrentPage(0);
            }}
            labelName={"행 개수"}
          >
            <SelectRowNumber />
          </Select>
          <Select
            selectValue={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(0);
            }}
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
            <th className="p-3">글번호</th>
            <th>카테고리</th>
            <th>글쓴이</th>
            <th>제목</th>
            <th>조회 수</th>
            <th>좋아요 수</th>
            <th>업로드일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <Fragment key={item.boardNo}>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{item.boardNo}</td>
                {/* <td>{item.boardCategory}</td> */}
                <td>{item.categoryId}</td>
                <td>{item.memberName}</td>
                <td
                  className="cursor-pointer"
                  onClick={() => navi(`/post/${item.categoryId}/${item.boardNo}`)}
                >
                  {item.boardTitle}
                </td>
                <td>{item.viewCount}</td>
                <td>{item.likeCount}</td>
                <td>{item.createdDate}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      item.isDeleted === "N"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                    onClick={() => handleSelectitemTable(item.boardNo)}
                  >
                    {item.isDeleted === "N" ? "Active" : "Disable"}
                  </span>
                </td>
              </tr>
              {selectedItemId === item.boardNo && (
                <tr className="bg-gray-50">
                  <td colSpan={8} className="px-4 py-3">
                    <div className="flex gap-2 items-center justify-end">
                      <span className="text-sm font-medium">
                        글 {item.boardNo}번 현재 상태
                      </span>
                      <input
                        type="text"
                        value={item.isDeleted === "N" ? "Active" : "Disable"}
                        className="border px-3 py-2 w-32 rounded"
                        placeholder="상태변경"
                        disabled
                      />
                      <button
                        className="bg-black text-white px-4 py-2 rounded"
                        onClick={() => handleData(item.boardNo, item.isDeleted)}
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

export default CommunityBoardManagementPage;

