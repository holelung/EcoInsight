import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import SummaryCard from "../../../components/DashBoard/SummaryCard";
import {memberList} from "../data";

import Pagination from "../../../components/Pagination/Pagination";
import Select from "../../../components/Input/Select/Select";
import SelectRowNumber from "../../../components/Input/Select/SelectRowNumber";
import Search from "../../../components/Input/Search/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../components/Context/AuthContext";



const PointManagementPage = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [point, setPoint] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [listState, setListState] = useState(false);


  useEffect(() => {
    if (auth.tokens.accessToken) {
      axios
        .get("http://localhost/admin/point", {
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
          console.info(response.data);
          setList([...response.data.memberList]);
          setTotalPages(Math.ceil(response.data.totalCount / rowsPerPage));
        });
    }
  }, [currentPage, rowsPerPage, sortOrder, listState, auth.tokens.accessToken, ]);




  const handleAddPoint = (memberName, memberNo) => {
    insertPoint(memberName, memberNo, point)
  };
  
  const handleMinusPoint = (memberName, memberNo) => {
    insertPoint(memberName, memberNo, point*-1)
  };

  const insertPoint = (memberName, memberNo, changePoint) => {
    axios
      .post(
        "http://localhost/admin/point",
        {
          memberNo: memberNo,
          changePoint: changePoint,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert(`${memberName} 회원에게 ${changePoint}가 지급되었습니다.`);
          setPoint(0);
          setSelectedUserId(null);
          setListState(!listState);
        }
      }).catch((error) => {
        alert(error.response.data["error-message"]);
        console.error(error, "오류발생");
      });
  }

  const handleSelectUserTable = (userId) => {
    if (selectedUserId == userId) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(userId);
    }
  };

  const handleSearch = () => {
    setListState(!listState);
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
        <div className="flex items-center gap-0.5">
          <Select
            selectValue={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
            }}
          >
            <option value="name">이름</option>
            <option value="id">아이디</option>
            <option value="email">이메일</option>
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
            <th className="p-3">유저 이름(세부정보)</th>
            <th>아이디</th>
            <th>전화번호</th>
            <th>Email</th>
            <th>가입일자</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <Fragment key={item.MemberNo}>
              <tr className="border-t hover:bg-gray-50">
                <td
                  className="px-4 py-3 cursor-pointer hover:bg-lime-200"
                  onClick={() =>
                    navi(`/admin/point-detail/${item.memberNo}`, {
                      state: item,
                    })
                  }
                >
                  {item.memberName}
                </td>
                <td>{item.memberId}</td>
                <td>{item.memberPh}</td>
                <td>{item.email}</td>
                <td>{item.memberEnrollDate}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      item.totalPoint > 0
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                    onClick={() => handleSelectUserTable(item.memberId)}
                  >
                    {item.totalPoint > 0
                      ? `${item.totalPoint.toLocaleString()}p`
                      : "noPoint"}
                  </span>
                </td>
              </tr>
              {selectedUserId === item.memberId && (
                <tr className="bg-gray-50">
                  <td colSpan={6} className="px-4 py-3">
                    <div className="flex gap-2 items-center justify-end">
                      <span className="text-sm font-medium">
                        {item.memberName} :
                      </span>
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => setPoint(e.target.value)}
                        className="border px-3 py-2 w-32 rounded"
                        placeholder="포인트 입력"
                      />
                      <button
                        className="bg-black text-white px-4 py-2 rounded"
                        onClick={() =>
                          handleAddPoint(item.memberName, item.memberNo)
                        }
                      >
                        증가
                      </button>
                      <button
                        className="bg-black text-white px-4 py-2 rounded"
                        onClick={() =>
                          handleMinusPoint(item.memberName, item.memberNo)
                        }
                      >
                        차감
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

export default PointManagementPage;