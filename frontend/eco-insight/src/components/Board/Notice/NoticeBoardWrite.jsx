import { useNavigate } from "react-router-dom";
import Tiptap from "../TipTap/Tiptap";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const NoticeBoardWrite = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleUpload = () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    console.log("title: ",title);
    console.log("content: ", content);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    
    // axios.post("/admin/notice", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    //   Authorization: `bearer ${auth.tokens.accessToken}`
    // }).then(response => {
    //   alert("게시물 업로드 완료!");
    //   navi(`/admin/noticeboard-manage`);
    // }).catch(error => {
    //   console.error("업로드 실패", error);
    //   alert("업로드 실패 😢");
    // });
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <div className="text-xl mb-3 p-2">공지사항 작성</div>
        {/* 제목 입력 */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 mb-3 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          placeholder="제목을 입력하세요"
        />

        <Tiptap setContent={ setContent } />

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
    </>
  );
};

export default NoticeBoardWrite;
