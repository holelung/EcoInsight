import React from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "relative",
    inset: "auto",
    margin: "auto",
    padding: "24px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    overflow: "auto",
    outline: "none",
  },
};

const ReportDetailModal = ({
  isOpen,
  onRequestClose,
  report,
  onStatusChange,
}) => {
  if (!report) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={customStyles} // ✅ 여기 주목
    >
      <h2 className="text-xl font-bold mb-4">신고 상세정보</h2>

      <div className="space-y-2">
        <p>
          <strong>신고자:</strong> {report.reporter}
        </p>
        <p>
          <strong>신고대상 게시글 번호:</strong> {report.boardNo}
        </p>
        <p>
          <strong>신고내용:</strong> {report.reportContent}
        </p>
        <p>
          <strong>현재 상태:</strong>{" "}
          {report.status === "Y" ? "처리완료" : "미처리"}
        </p>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={onStatusChange}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          상태 변경
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          닫기
        </button>
      </div>
    </Modal>
  );
};

export default ReportDetailModal;
