import { useState } from "react";
import SummaryCard from "../../../components/DashBoard/SummaryCard";
import {memberList} from "../data";
import SelectOptions from "../../../components/Button/SelectOptions";


const PointManagementPage = () => {
  const [members] = useState(memberList);
  const [pointValue, setPointValue] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const filteredMembers = members
    .filter((u) =>
      [u.memberName, u.memberId, u.memberPh].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "Newest") return b.id - a.id;
      if (sortOrder === "Oldest") return a.id - b.id;
      return 0;
    });

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);

  const handleApplyPoint = (memberName) => {
    alert(`${memberName} 님에게 ${pointValue} 포인트가 적용됩니다.`);
    setPointValue(0);
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
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="rowsPerPage" className="text-sm text-gray-600">
              행 개수
            </label>
            <select
              id="rowsPerPage"
              className="border px-2 py-2 rounded"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <SelectOptions />
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sortOrder" className="text-sm text-gray-600">
              정렬
            </label>
            <select
              id="sortOrder"
              className="border px-2 py-2 rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
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
            <th>가입일자</th>
            <th>Points</th>
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
                <td>{user.enrollDate}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      user.point > 0
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                    onClick={() => handleSelectUserTable(user.memberId)}
                  >
                    {user.point > 0 ? `${user.point}p` : "noPoint"}
                  </span>
                </td>
              </tr>
              {selectedUserId === user.memberId && (
                <tr className="bg-gray-50">
                  <td colSpan={6} className="px-4 py-3">
                    <div className="flex gap-2 items-center justify-end">
                      <span className="text-sm font-medium">
                        {user.memberName} 님에게 포인트 지급:
                      </span>
                      <input
                        type="number"
                        value={pointValue}
                        onChange={(e) => setPointValue(e.target.value)}
                        className="border px-3 py-2 w-32 rounded"
                        placeholder="포인트 입력"
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
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setCurrentPage(n)}
            className={`px-3 py-1 rounded ${
              n === currentPage ? "bg-lime-400 text-white" : "bg-gray-200"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PointManagementPage;