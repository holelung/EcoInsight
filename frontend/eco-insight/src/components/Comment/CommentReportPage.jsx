import React, { useState } from "react";

const CommentReportPage = ({ isOpen, onClose, author, postTitle }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [detail, setDetail] = useState("");

  const reasons = [
    "스팸홍보/도배글입니다.",
    "불법정보를 포함하고 있습니다.",
    "청소년에게 유해한 내용입니다.",
    "욕설/혐오/차별적 발언 포함한 내용입니다.",
    "불쾌한 표현이 있습니다.",
    "기타",
  ];

  const handleSubmit = () => {
    if (!selectedReason) {
      alert("신고 사유를 선택해주세요.");
      return;
    }

    alert("신고가 완료되었습니다!");
    console.log("🚨 신고 내용:", {
      author,
      postTitle,
      selectedReason,
      detail,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white w-[400px] rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <div className="bg-gray-100 px-6 py-4 text-center text-lg font-bold">
          신고하기
        </div>

        <div className="p-6 space-y-3 text-sm">
          <div>
            작성자 | <span className="font-medium">{author}</span>
          </div>
          <div>
            내용 | <span className="font-medium">{postTitle}</span>
          </div>

          <div className="mt-4">
            <div className="font-semibold mb-2">사유 선택</div>
            <div className="space-y-2">
              {reasons.map((reason, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="report-reason"
                    className="accent-blue-500"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedReason && (
            <textarea
              placeholder="상세 내용 입력 (선택)"
              className="w-full mt-4 p-2 border border-gray-300 rounded"
              rows={4}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          )}

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 transition"
            >
              신고하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentReportPage;
