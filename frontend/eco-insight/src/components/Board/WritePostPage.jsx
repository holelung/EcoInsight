import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const WritePostPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const boardNames = {
    free: "자유게시판",
    qna: "질문 게시판",
    tips: "팁 게시판",
  };

  const boardName = boardNames[type] || "게시판";

  // 🟩 입력값 state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // 🟩 파일 선택 핸들러
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

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
    files.forEach((file) => formData.append("files", file));

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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      {/* 게시판 타입 텍스트 */}
      <div className="mb-4 text-sm text-gray-500">{boardName}</div>

      {/* 제목 입력 */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        placeholder="제목을 입력하세요"
      />

      {/* 툴바 (디자인만, 기능 없음) */}
      <div className="flex gap-2 mt-6 mb-2 text-sm">
        <button className="px-2 py-1 hover:bg-gray-200 rounded">B</button>
        <button className="px-2 py-1 hover:bg-gray-200 rounded italic">
          I
        </button>
        <button className="px-2 py-1 hover:bg-gray-200 rounded underline">
          U
        </button>
        <button className="px-2 py-1 hover:bg-gray-200 rounded">🔗 링크</button>
        <button className="px-2 py-1 hover:bg-gray-200 rounded">
          🖼️ 이미지
        </button>
      </div>

      {/* 본문 내용 입력 */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-60 p-4 border border-gray-300 rounded-md bg-gray-50 text-base focus:outline-none focus:ring-2 focus:ring-green-200"
        placeholder="내용을 입력해주세요. 사진, 링크, 코드 등 자유롭게 작성할 수 있어요!"
      />

      {/* 파일 업로드 */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mt-4"
      />

      {/* 이미지 미리보기 */}
      {previews.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          {previews.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`preview-${idx}`}
              className="h-32 object-cover rounded border"
            />
          ))}
        </div>
      )}

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

export default WritePostPage;
