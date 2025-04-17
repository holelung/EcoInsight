import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import ReportPage from "../ReportPage";
import { AuthContext } from "../../Context/AuthContext";
import CommunityComment from "./CommunityComment";

const CommunityBoardDetail = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const editorRef = useRef();

  const [isEditing, setIsEditing] = useState(false);
  const [likes, setLikes] = useState(5);
  const [title, setTitle] = useState("예쁜 게시글 제목 🎉");
  const [content, setContent] = useState("게시글 본문 내용입니다.");
  const [editedTitle, setEditedTitle] = useState(title);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const [comments, setComments] = useState([
    { text: "첫 번째 댓글입니다.", replies: [] },
    { text: "두 번째 댓글이에요!", replies: [] },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState("");

  const handleLike = () => setLikes(likes + 1);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment.trim(), replies: [] }]);
      setNewComment("");
    }
  };

  const handleAddReply = (index) => {
    if (newReply.trim()) {
      const updatedComments = [...comments];
      updatedComments[index].replies.push(newReply.trim());
      setComments(updatedComments);
      setNewReply("");
      setReplyingTo(null);
    }
  };

  const handleSaveEdit = () => {
    const editedMarkdown = editorRef.current?.getInstance().getMarkdown();
    setTitle(editedTitle);
    setContent(editedMarkdown);
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
          <div className="mt-6">
            <Editor
              ref={editorRef}
              height="400px"
              initialEditType="wysiwyg"
              previewStyle="vertical"
              autofocus={true}
              placeholder="내용을 입력해주세요. 마크다운을 자유롭게 활용할 수 있어요!"
              plugins={[colorSyntax]}
              hideModeSwitch={true}
              toolbarItems={[
                ["bold", "italic", "strike"],
                ["hr", "quote"],
                ["ul", "ol"],
                ["image", "link"],
                ["codeblock"],
              ]}
            />
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
        <div className="border-t pt-2 text-sm text-gray-600">
          📎 첨부파일: 예시파일.png
        </div>
      </div>

      {/* 좋아요 + 댓글 수 */}
      {!isEditing && (
        <div className="flex justify-between items-center">
          <button
            onClick={handleLike}
            className="px-4 py-1 border border-gray-300 rounded hover:bg-black hover:text-white transition"
          >
            👍 좋아요 {likes}
          </button>
          <span className="text-sm text-gray-500">
            💬 댓글 {comments.length}개
          </span>
        </div>
      )}

      {/* 수정/삭제/신고 버튼 */}
      <div className="flex justify-end gap-2">
        {auth.isAuthenticated && isEditing ? (
          <button
            onClick={handleSaveEdit}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            저장
          </button>
        ) : (
          <>
            {auth.isAuthenticated && auth.loginInfo === auth && (
              <>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditedTitle(title);
                  }}
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
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              신고
            </button>
          </>
        )}
      </div>
      <CommunityComment />
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
    </div>
  );
};

export default CommunityBoardDetail;
