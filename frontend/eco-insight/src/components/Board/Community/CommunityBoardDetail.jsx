import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportPage from "../ReportPage";
import { AuthContext } from "../../Context/AuthContext";
import CommunityComment from "../../Comment/CommunityComment/CommunityComment";

const CommunityBoardDetail = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [likes, setLikes] = useState(5);
  const [title, setTitle] = useState("예쁜 게시글 제목 🎉");
  const [content, setContent] = useState("게시글 본문 내용입니다.");
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleLike = () => setLikes(likes + 1);

  const handleSaveEdit = () => {
    setTitle(editedTitle);
    setContent(editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      alert("삭제되었습니다.");
      navigate(-1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* 제목 */}
      <div className="text-2xl font-bold">
        {isEditing ? (
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h1>{title}</h1>
        )}
      </div>

      {/* 작성자 */}
      <div className="text-sm text-gray-600 flex justify-between">
        <span>작성자: 사용자123</span>
        <span>2025-04-16</span>
      </div>

      {/* 본문 */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-4">
        {isEditing ? (
          <textarea
            className="w-full h-40 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
        <div className="border-t pt-2 text-sm text-gray-600">
          📎 첨부파일: 예시파일.png
        </div>
      </div>

      {/* 좋아요 */}
      {!isEditing && (
        <div className="flex justify-between items-center">
          <button
            onClick={handleLike}
            className="px-4 py-1 border border-gray-300 rounded hover:bg-black hover:text-white transition"
          >
            👍 좋아요 {likes}
          </button>
        </div>
      )}

      {/* 수정/삭제/신고 버튼 */}
      <div className="flex justify-end gap-2">
        {!(auth.isAuthenticated && isEditing) ? (
          <button
            onClick={() => setIsReportOpen(true)}
            className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
          >
            신고
          </button>
        ) : (
          <>
            {auth.isAuthenticated && auth.loginInfo == auth && (
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
            )}
          </>
        )}
      </div>

      {/* 돌아가기 */}
      <button
        onClick={() => navigate(-1)}
        className="w-full mt-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
      >
        게시글 목록으로 돌아가기
      </button>

      {/* 신고 모달 */}
      {isReportOpen && (
        <ReportPage
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          author={"사용자123"}
          postTitle={title}
        />
      )}
      <CommunityComment />
    </div>
  );
};

export default CommunityBoardDetail;
