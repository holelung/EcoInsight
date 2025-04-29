import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const NoticeBoardDetail = () => {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const navi = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [notice, setNotice] = useState({});
  const [title, setTitle] = useState("예쁜 게시글 제목 🎉");
  const [content, setContent] = useState("게시글 본문 내용입니다.");
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    axios.get("http://localhost/notice", {
      params: {
        boardNo:id,
      }
    }).then((response) => {
      setNotice(response.data);
    }).catch((error) => {
      console.log(error);
    })
  },[id])

  const handleSaveEdit = () => {
    setTitle(editedTitle);
    setContent(editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      alert("삭제되었습니다.");
      navi(-1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* 제목 */}
      <div className="text-2xl font-bold">
        {isEditing ? (
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            value={notice.boardTitle}
            onChange={(e) => setNotice(prev => ({...prev, boardTitle: e.target.value}))}
          />
        ) : (
          <h1>{notice.boardTitle}</h1>
        )}
      </div>

      {/* 작성자 */}
      <div className="text-sm text-gray-600 flex justify-between">
        <span>작성자: {notice.memberName}</span>
        <span>{notice.createdDate}</span>
      </div>

      {/* 본문 */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-4">
        {isEditing ? (
          <textarea
            className="w-full h-40 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            value={notice.boardContent}
            onChange={(e) => setNotice(prev => ({...prev, boardContent:e.target.value}))}
          />
        ) : (
          <p className="whitespace-pre-wrap">{notice.boardContent}</p>
        )}
        <div className="border-t pt-2 text-sm text-gray-600">
          📎 첨부파일: 예시파일.png
        </div>
      </div>

      {/* 수정/삭제 버튼 */}
      {auth.isAuthenticated.memberRole === "ROLE_ADMIN" && (
        <div className="flex justify-end gap-2">
          <>
            <>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
              >
                수정하기
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50"
              >
                삭제하기
              </button>
            </>
          </>
        </div>
      )}

      {/* 돌아가기 */}
      <button
        onClick={() => navi(-1)}
        className="w-full mt-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
      >
        게시글 목록으로 돌아가기
      </button>
    </div>
  );
};

export default NoticeBoardDetail;
