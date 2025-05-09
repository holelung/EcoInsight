import { Fragment, useMemo, useState } from "react";
import SummaryCard from "../../../components/DashBoard/SummaryCard";
import { reportList, memberList } from "../data";

import Pagination from "../../../components/Pagination/Pagination";
import Select from "../../../components/Input/Select/Select";
import SelectRowNumber from "../../../components/Input/Select/SelectRowNumber";
import Search from "../../../components/Input/Search/Search";
import ReportDetailModal from "./ReportDetailModal";

const ReportManagementPage = () => {
  const [list, setList] = useState(reportList);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleOpenDetail = (item) => {
    setSelectedReport(item);
    setModalIsOpen(true);
  };

  const handleCloseDetail = () => {
    setModalIsOpen(false);
  };

  const handleStatusChangeInModal = () => {
    if (selectedReport) {
      const updatedStatus = selectedReport.status === "Y" ? "N" : "Y";
      const updatedReport = { ...selectedReport, status: updatedStatus };
      setSelectedReport(updatedReport);

      // 전체 리스트 안에서도 상태를 업데이트하려면 필요
      setList((prevList) =>
        prevList.map((item) =>
          item.reportNo === updatedReport.reportNo ? updatedReport : item
        )
      );
    }
  };

  // 검색 DB로갈 경우 필요없음
  const filteredReports = useMemo(() => {
    return list
      .filter((u) =>
        [u.reporter, u.reportContent, u.reportCategoryId].some((field) =>
          field?.toLowerCase().includes(search.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (sortOrder === "Newest") return b.reportNo - a.reportNo;
        if (sortOrder === "Oldest") return a.reportNo - b.reportNo;
        return 0;
      });
  }, [list, search, sortOrder]);

  const currentList = useMemo(() => {
    const startIndex = currentPage * rowsPerPage;
    return filteredReports.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredReports, currentPage, rowsPerPage]);
  const totalPages = Math.ceil(filteredReports.length / rowsPerPage);

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
        <SummaryCard icon="🚨" title="오늘의 신고 건수" value="23" positive />
        <SummaryCard
          icon="⏳"
          title="미처리 신고 건수"
          value="8"
          positive={false}
        />
        <SummaryCard icon="✅" title="처리한 신고 건수" value="15" positive />
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
        </div>
      </div>

      {/* 사용자 테이블 */}
      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden text-sm shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">신고번호</th>
            <th>신고분류</th>
            <th>신고자</th>
            <th>신고대상</th>
            <th>신고내용</th>
            <th>내용확인</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {currentList.map((item) => (
            <Fragment key={item.reportNo}>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{item.reportNo}</td>
                <td>[item.reportCategoryId]</td>
                <td>{item.reporter}</td>
                <td>{item.boardNo}</td>
                <td>{item.reportContent}</td>
                <td>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleOpenDetail(item)}
                  >
                    내용확인
                  </button>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      item.status === "Y"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status === "Y" ? "처리완료" : "미처리"}
                  </span>
                </td>
              </tr>
              {selectedItemId === item.boardNo && (
                <tr className="bg-gray-50">
                  <td colSpan={6} className="px-4 py-3">
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

      <ReportDetailModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseDetail}
        report={selectedReport}
        onStatusChange={handleStatusChangeInModal}
      />
    </div>
  );
};

export default ReportManagementPage;
