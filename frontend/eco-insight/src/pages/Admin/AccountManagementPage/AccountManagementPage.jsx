import { useContext, useEffect, useMemo, useState } from "react";
import SummaryCard from "../../../components/DashBoard/SummaryCard";
import {memberList} from "../data";
import dayjs from "dayjs";

import Pagination from "../../../components/Pagination/Pagination";
import Search from "../../../components/Input/Search/Search";
import Select from "../../../components/Input/Select/Select";
import SelectRowNumber from "../../../components/Input/Select/SelectRowNumber";
import { AuthContext } from "../../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccountManagementPage = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [banPeriod, setBanPeriod] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [listState, setListState] = useState(false);
  
  useEffect(() => {
    if (auth.tokens.accessToken) {
      axios
        .get("http://localhost/admin/account", {
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
          console.info(response);
          setList([...response.data.memberList]);
          setTotalPages(Math.ceil(response.data.totalCount / rowsPerPage));
        });
    }
  }, [currentPage, rowsPerPage, sortOrder, listState, auth.tokens.accessToken]);


  const handleApplyPoint = (memberName) => {
    alert(`${memberName} 님에게 ${banPeriod}일 정지가 적용됩니다.`);
    setBanPeriod(0);
    setSelectedUserId(null);
  };

  const handleSelectUserTable = (userId) => {
    if (selectedUserId == userId) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(userId);
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
          title="전체 유저 수"
          value="3,423"
          change="+12%"
          positive
        />
        <SummaryCard
          icon="🚮"
          title="신규 회원"
          value="321"
          change="+2%"
          positive
        />
        <SummaryCard
          icon="💻"
          title="정지 유저"
          value="13"
          change="-3%"
          positive={false}
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
            <th className="p-3">유저 이름</th>
            <th>아이디</th>
            <th>전화번호</th>
            <th>Email</th>
            <th>정지 정보</th>
            <th>활성상태</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <>
              <tr key={item.memberNo} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{item.memberName}</td>
                <td>{item.memberId}</td>
                <td>{item.memberPh}</td>
                <td>{item.email}</td>
                <td>
                  {item.banDate != null
                    ? `${item.banDate} - ${dayjs(item.banDate)
                        .add(item.banPeriod, "day")
                        .format("YYYY-MM-DD")}(${item.banPeriod}일) `
                    : "정지정보 없음"}
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      item.isActive === "Y"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                    onClick={() => handleSelectUserTable(item.memberId)}
                  >
                    {item.isActive === "Y" ? `Active` : "Inactive"}
                  </span>
                </td>
              </tr>
              {selectedUserId === item.memberId && (
                <tr className="bg-gray-50">
                  <td colSpan={6} className="px-4 py-3">
                    <div className="flex gap-2 items-center justify-end">
                      <span className="text-sm font-medium flex ">
                        <p className="font-bold pr-1">{item.memberName}</p>
                        회원 정지 일자 설정 :
                      </span>
                      <input
                        type="number"
                        value={banPeriod}
                        onChange={(e) => setBanPeriod(e.target.value)}
                        className="border px-3 py-2 w-32 rounded"
                        placeholder="정지 일수 입력"
                      />
                      <button
                        className="bg-black text-white px-4 py-2 rounded"
                        onClick={() => handleApplyPoint(item.memberName)}
                      >
                        적용
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

export default AccountManagementPage;
