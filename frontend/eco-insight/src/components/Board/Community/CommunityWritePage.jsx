import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Tiptap from "../TipTap/Tiptap";

const CommunityWritePage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [isReportOpen, setIsReportOpen] = useState(false);

  const boardNames = {
    free: "자유게시판",
    qna: "질문 게시판",
    tips: "팁 게시판",
  };

  const boardName = boardNames[type] || "게시판";

  // 🟩 입력값 state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 🟩 업로드 핸들러
  const handleUpload = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    const formData = new FormData();
    formData.append("categoryType", type);
    formData.append("title", title);
    formData.append("content", content);

    try {
      await axios.post("/api/board/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("게시물 업로드 완료!");
      navigate(`/board/${type}`);
    } catch (error) {
      console.error("업로드 실패", error);
      alert("업로드 실패 😢");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      {/* 게시판 타입 텍스트 */}
      <div className="mb-4 text-sm text-gray-500">{boardName}</div>

      {/* 제목 입력 */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        placeholder="제목을 입력하세요"
      />

      <Tiptap />

      {/* 업로드 버튼 */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleUpload}
          className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-md font-bold transition"
        >
          업로드
        </button>
      </div>
    </div>
  );
};

export default CommunityWritePage;
