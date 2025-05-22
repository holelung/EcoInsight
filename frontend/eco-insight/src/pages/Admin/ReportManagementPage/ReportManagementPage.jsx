import { Fragment, useMemo, useState, useEffect } from "react";
import SummaryCard from "../../../components/DashBoard/SummaryCard";
import Pagination from "../../../components/Pagination/Pagination";
import Select from "../../../components/Input/Select/Select";
import SelectRowNumber from "../../../components/Input/Select/SelectRowNumber";
import Search from "../../../components/Input/Search/Search";
import ReportDetailModal from "./ReportDetailModal";
import axios from "axios";
import dayjs from "dayjs";

const ReportManagementPage = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState("전체");
  const today = dayjs().format("YYYY-MM-DD");
  const API_URL = import.meta.env.VITE_API_URL;

  const todaysReports = list.filter(
    (item) => dayjs(item.reportDate).format("YYYY-MM-DD") === today
  );
  const processedCount = todaysReports.filter(
    (item) => item.isDeleted === "Y"
  ).length;
  const todaysTotal = todaysReports.length;
  const unprocessedCount = todaysTotal - processedCount;

  useEffect(() => {
    axios
      .get("http://localhost/reports/all")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.error("신고 목록 불러오기 실패:", err);
      });
  }, []);

  const handleOpenDetail = (item) => {
    setSelectedReport(item);
    setModalIsOpen(true);
  };

  const handleCloseDetail = () => {
    setModalIsOpen(false);
  };

  const handleStatusChangeInModal = () => {
    if (selectedReport) {
      const updatedStatus = selectedReport.isDeleted === "Y" ? "N" : "Y";
      const updatedReport = { ...selectedReport, isDeleted: updatedStatus };
      setSelectedReport(updatedReport);
      setList((prevList) =>
        prevList.map((item) =>
          item.reportNo === updatedReport.reportNo ? updatedReport : item
        )
      );
    }
  };

  const handleSearch = () => {
    setCurrentPage(0);
  };

  const filteredReports = useMemo(() => {
    return list
      .filter((u) => {
        const matchesSearch = [
          u.reporter,
          u.reportContent,
          u.reportCategoryId,
        ].some((field) =>
          field?.toString().toLowerCase().includes(search.toLowerCase())
        );
        const matchesType =
          filterType === "전체" || u.reportType === filterType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortOrder === "Newest") return b.reportNo - a.reportNo;
        if (sortOrder === "Oldest") return a.reportNo - b.reportNo;
        return 0;
      });
  }, [list, search, sortOrder, filterType]);

  const currentList = useMemo(() => {
    const startIndex = currentPage * rowsPerPage;
    return filteredReports.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredReports, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredReports.length / rowsPerPage);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          icon="🚨"
          title="오늘의 신고 건수"
          value={todaysTotal}
          positive
        />
        <SummaryCard
          icon="⏳"
          title="미처리 신고 건수"
          value={unprocessedCount}
          positive={false}
        />
        <SummaryCard
          icon="✅"
          title="처리한 신고 건수"
          value={processedCount}
          positive
        />
      </div>

      <div className="flex justify-between items-center">
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
        />
        <div className="flex items-center gap-4">
          <Select
            selectValue={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(0);
            }}
            labelName="행 개수"
          >
            <SelectRowNumber />
          </Select>
          <Select
            selectValue={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            labelName="정렬"
          >
            <option value="Newest">최신순</option>
            <option value="Oldest">오래된순</option>
          </Select>
          <Select
            selectValue={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            labelName="유형"
          >
            <option value="전체">전체</option>
            <option value="커뮤니티 게시글">커뮤니티 게시글</option>
            <option value="인증 게시글">인증 게시글</option>
            <option value="커뮤니티 댓글">커뮤니티 댓글</option>
            <option value="인증 댓글">인증 댓글</option>
          </Select>
        </div>
      </div>

      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden text-sm shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">신고번호</th>
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
                <td>{item.reporter}</td>
                <td>{item.boardNo ?? item.commentNo ?? "-"}</td>
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
                      item.isDeleted === "Y"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.isDeleted === "Y" ? "처리완료" : "미처리"}
                  </span>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>

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
