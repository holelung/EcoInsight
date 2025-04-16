import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PrivateAskPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const boardName = "질문 작성";

  const handleUpload = () => {
    alert("게시물 업로드 완료!");
    navigate(`/board/${type}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      {/* 카테고리 */}
      <div className="mb-4 text-sm text-gray-500">{boardName}</div>

      <input
        className="w-full p-4 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 mb-5"
        placeholder="본인 이메일을 입력해주세요"
      />
      {/* 제목 */}
      <input
        className="w-full p-4 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        placeholder="제목을 입력하세요"
      />

      {/* 툴바 */}
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

      {/* 텍스트 에디터 */}
      <textarea
        className="w-full h-60 p-4 border border-gray-300 rounded-md bg-gray-50 text-base resize-none focus:outline-none focus:ring-2 focus:ring-green-200"
        placeholder="내용을 입력해주세요. 사진, 링크, 코드 등 자유롭게 작성할 수 있어요!"
      />

      {/* 이미지 미리보기 */}
      <div className="mt-6 mb-6 bg-gray-100 border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 text-gray-500">
        <div className="text-4xl mb-2">🖼️</div>
        <p className="text-sm">이미지를 첨부하면 여기 미리보기가 표시됩니다</p>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-md font-bold transition"
        >
          보내기
        </button>
      </div>
    </div>
  );
}
