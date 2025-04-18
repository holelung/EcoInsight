import { useState } from "react";
import SummaryCard from "../../../components/DashBoard/SummaryCard";

// Mock 데이터
const mockUsers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  company: ["Microsoft", "Google", "Yahoo", "Adobe", "Tesla"][i % 5],
  phone: `(200) 555-01${String(i + 10).padStart(2, "0")}`,
  email: `user${i + 1}@example.com`,
  country: ["United States", "Israel", "Iran", "Brazil", "Japan"][i % 5],
  point: i % 3 === 0 ? 0 : (i + 1) * 100,
}));

const CommunityBoardManagementPage = () => {
  const [users] = useState(mockUsers);
  const [pointValue, setPointValue] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("Newest");

  const filteredUsers = users
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "Newest") return b.id - a.id;
      if (sortOrder === "Oldest") return a.id - b.id;
      return 0;
    });

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const handleApplyPoint = () => {
    alert(`${pointValue} 포인트가 적용됩니다.`);
    setPointValue(0);
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
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
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
            <th className="p-3">Customer Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Country</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">{user.name}</td>
              <td>{user.company}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.country}</td>
              <td>
                {user.point > 0 ? (
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                    {user.point}p
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                    noPoint
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 하단 포인트 입력 */}
      <div className="mt-4 flex gap-2">
        <input
          type="number"
          value={pointValue}
          onChange={(e) => setPointValue(e.target.value)}
          className="border px-3 py-2 w-32 rounded"
          placeholder="포인트 입력"
        />
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={handleApplyPoint}
        >
          적용
        </button>
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setCurrentPage(n)}
            className={`px-3 py-1 rounded ${
              n === currentPage ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommunityBoardManagementPage;
