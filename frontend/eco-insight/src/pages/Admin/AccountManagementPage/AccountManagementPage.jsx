import { useMemo, useState } from "react";
import SummaryCard from "../../../components/DashBoard/SummaryCard";
import {memberList} from "../data";
import dayjs from "dayjs";

import Pagination from "../../../components/Pagination/Pagination";
import Search from "../../../components/Input/Search/Search";
import Select from "../../../components/Input/Select/Select";
import SelectRowNumber from "../../../components/Input/Select/SelectRowNumber";

const AccountManagementPage = () => {
  const [members, setMembers] = useState(memberList);
  const [banPeriod, setBanPeriod] = useState();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedUserId, setSelectedUserId] = useState(null);

  
    // 검색 DB로갈 경우 필요없음
    const filteredMembers = useMemo(() => {
      return members
        .filter((u) =>
          [u.memberName, u.memberId, u.memberPh].some((field) =>
            field.toLowerCase().includes(search.toLowerCase())
          )
        )
        .sort((a, b) => {
          if (sortOrder === "Newest") return b.memberNo - a.memberNo;
          if (sortOrder === "Oldest") return a.memberNo - b.memberNo;
          return 0;
        });
    }, [members, search, sortOrder]);

    const currentMembers = useMemo(() => {
      const startIndex = currentPage * rowsPerPage;
      return filteredMembers.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredMembers, currentPage, rowsPerPage]);
    const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);

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
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          searchResult={setMembers}
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
          {currentMembers.map((user) => (
            <>
              <tr key={user.memberNo} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{user.memberName}</td>
                <td>{user.memberId}</td>
                <td>{user.memberPh}</td>
                <td>{user.email}</td>
                <td>
                  {user.banDate != null
                    ? `${user.banDate} - ${dayjs(user.banDate)
                        .add(user.banPeriod, "day")
                        .format("YYYY-MM-DD")}(${user.banPeriod}일) `
                    : "정지정보 없음"}
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      user.isActive === "Y"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                    onClick={() => handleSelectUserTable(user.memberId)}
                  >
                    {user.isActive === "Y" ? `Active` : "Inactive"}
                  </span>
                </td>
              </tr>
              {selectedUserId === user.memberId && (
                <tr className="bg-gray-50">
                  <td colSpan={6} className="px-4 py-3">
                    <div className="flex gap-2 items-center justify-end">
                      <span className="text-sm font-medium flex ">
                        <p className="font-bold pr-1">{user.memberName}</p>
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
                        onClick={() => handleApplyPoint(user.memberName)}
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
