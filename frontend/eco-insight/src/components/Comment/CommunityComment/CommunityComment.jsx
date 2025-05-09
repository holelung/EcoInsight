import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import CommentReportPage from "../CommentReportPage";
import Separate from "../../Seperate/Seperate";

const CommunityComment = ({ boardNo }) => {
  const { auth } = useContext(AuthContext);
  const memberNo = auth.loginInfo.memberNo;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState({ author: "", content: "" });
  const [commentCount, setCommentCount] = useState(0);
  const [getParentCommentNo, setgetParentCommentNo] = useState(0);

  const [editingCommentNo, setEditingCommentNo] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const fetchComments = () => {
    axios
      .get("http://localhost/communities/comments-List", {
        params: { boardNo },
      })
      .then((response) => setComments(response.data))
      .catch((err) => console.error("댓글 목록 조회 실패:", err));
  };

  const fetchCommentCount = () => {
    axios
      .get("http://localhost/communities/count", {
        params: { boardNo },
      })
      .then((response) => setCommentCount(response.data))
      .catch((err) => console.error("댓글 수 조회 실패:", err));
  };

  const handleAddComment = () => {
    if (!auth.isAuthenticated) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    if (!newComment.trim()) return;

    axios
      .post(
        "http://localhost/communities/comments",
        {
          boardNo: boardNo,
          memberNo: memberNo,
          getParentCommentNo: 0,
          commentContent: newComment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
        }
      )
      .then(() => {
        setNewComment("");
        fetchComments();
        fetchCommentCount();
      })
      .catch((err) => {
        console.error("댓글 등록 실패:", err);
      });
  };

  const handleEditSubmit = (commentNo) => {
    if (!editedContent.trim()) return;

    axios
      .put(
        "http://localhost/communities/comment-update",
        {
          commentNo: commentNo,
          memberNo: memberNo,
          commentContent: editedContent.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
        }
      )
      .then(() => {
        setEditingCommentNo(null);
        setEditedContent("");
        fetchComments();
      })
      .catch((err) => console.error("댓글 수정 실패:", err));
  };

  const handleDeleteComment = (commentNo) => {
    if (!auth.isAuthenticated) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    axios
      .delete("http://localhost/communities/comment-delete", {
        data: {
          commentNo: commentNo,
          memberNo: memberNo,
        },
        headers: {
          Authorization: `Bearer ${auth.tokens.accessToken}`,
        },
      })
      .then(() => {
        fetchComments();
        fetchCommentCount();
      })
      .catch((err) => console.error("댓글 삭제 실패:", err));
  };

  useEffect(() => {
    fetchComments();
    fetchCommentCount();
  }, [boardNo]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">댓글({commentCount})</h2>

      <div className="space-y-4">
        {comments.map((comment, index) => {
          const isAuthorComment =
            Number(auth.loginInfo?.memberNo) === Number(comment.memberNo);

          return (
            <div
              key={index}
              className="p-4 bg-white border border-gray-200 rounded-md space-y-2"
            >
              <div className="flex justify-between items-center">
                {editingCommentNo === comment.commentNo ? (
                  <input
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                ) : (
                  <span>{comment.commentContent}</span>
                )}

                <div className="flex gap-2">
                  {isAuthorComment && (
                    <>
                      {editingCommentNo === comment.commentNo ? (
                        <>
                          <button
                            onClick={() => handleEditSubmit(comment.commentNo)}
                            className="text-sm text-blue-500 hover:underline"
                          >
                            저장
                          </button>
                          <Separate />
                          <button
                            onClick={() => {
                              setEditingCommentNo(null);
                              setEditedContent("");
                            }}
                            className="text-sm text-gray-500 hover:underline"
                          >
                            취소
                          </button>
                          <Separate />
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingCommentNo(comment.commentNo);
                              setEditedContent(comment.commentContent);
                            }}
                            className="text-sm text-gray-500 hover:underline"
                          >
                            수정하기
                          </button>
                          <Separate />
                          <button
                            onClick={() =>
                              handleDeleteComment(comment.commentNo)
                            }
                            className="text-sm text-gray-500 hover:underline"
                          >
                            삭제하기
                          </button>

                          <Separate />
                        </>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => {
                      setReportTarget({
                        author: comment.memberNo,
                        content: comment.commentContent,
                      });
                      setIsReportOpen(true);
                    }}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 hover:underline"
                  >
                    신고
                  </button>
                </div>
              </div>

              {/* 답글 입력창 */}
            </div>
          );
        })}
      </div>

      {/* 댓글 입력창 */}
      <div className="flex gap-2 mt-6">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="flex-grow px-4 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          등록
        </button>
      </div>

      {/* 신고 모달 */}
      {isReportOpen && (
        <CommentReportPage
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          author={reportTarget.author}
          postTitle={reportTarget.content}
        />
      )}
    </div>
  );
};

export default CommunityComment;
