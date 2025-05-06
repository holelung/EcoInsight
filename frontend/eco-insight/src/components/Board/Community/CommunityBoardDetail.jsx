import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReportPage from "../ReportPage";
import { AuthContext } from "../../Context/AuthContext";
import CommunityComment from "../../Comment/CommunityComment/CommunityComment";

const CommunityBoardDetail = () => {
  const navigate = useNavigate();
  const { boardNo, categoryId } = useParams();
  const { auth } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [likes, setLikes] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [authorName, setAuthorName] = useState(""); // 화면용 이름
  const [authorId, setAuthorId] = useState(""); // 비교용 ID
  const [createdDate, setCreatedDate] = useState("");

  const fetchPostDetail = () => {
    axios
      .get("http://localhost/communities/community-detail", {
        params: { boardNo, categoryId },
      })
      .then((response) => {
        const data = response.data.board;
        setTitle(data.boardTitle);
        setContent(data.boardContent);
        setLikes(data.likeCount);
        setCreatedDate(data.createdDate);
        setEditedTitle(data.boardTitle);
        setEditedContent(data.boardContent);
        setAuthorName(data.memberName); // 보여줄 이름
        setAuthorId(data.memberId); // id 비교
      })
      .catch((err) => {
        console.error("게시글 상세 조회 실패:", err);
      });
  };

  useEffect(() => {
    fetchPostDetail();
  }, [boardNo, categoryId]);

  useEffect(() => {
    console.log("likeCount:", likes);
  }, [likes]);

  useEffect(() => {
    console.log("auth.loginInfo?.username:", auth.loginInfo?.username);
    console.log("authorId:", authorId);
    console.log("같은가?:", auth.loginInfo?.username === authorId);
  }, [auth, authorId]);

  const handleLike = () => {
    if (!auth.isAuthenticated) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    axios
      .post(
        "http://localhost/communities/like",
        {
          boardNo: boardNo,
          memberNo: auth.loginInfo?.memberNo,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("좋아요 처리 응답:", response.data);
        setLikes(response.data);
      })
      .catch((err) => {
        console.error("좋아요 처리 실패:", err);
      });
  };

  const handleEditSubmit = () => {
    axios
      .post("http://localhost/communities/community-edit", {
        boardNo,
        categoryId,
        title: editedTitle,
        content: editedContent,
      })
      .then(() => {
        setTitle(editedTitle);
        setContent(editedContent);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        alert("수정에 실패했습니다.");
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost/communities/community-delete`, {
        params: {
          boardNo: Number(boardNo),
          memberNo: Number(auth.loginInfo?.memberNo),
        },
        headers: {
          Authorization: `Bearer ${auth.tokens.accessToken}`,
        },
      })
      .then(() => {
        alert("삭제되었습니다.");
        navigate(-1);
      })
      .catch((err) => {
        console.error("삭제 실패:", err);
      });
  };

  const isAuthor =
    !!auth.loginInfo?.username &&
    !!authorId &&
    String(auth.loginInfo.username) === String(authorId);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* 제목 */}
      <div className="text-2xl font-bold">
        {isEditing ? (
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h1>{title}</h1>
        )}
      </div>

      {/* 작성자 */}
      <div className="text-sm text-gray-600 flex justify-between">
        <span>작성자: {authorName}</span>
        <span>{createdDate}</span>
      </div>

      {/* 본문 */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-4">
        {isEditing ? (
          <textarea
            className="w-full h-40 p-3 border border-gray-300 rounded"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>

      {/* 좋아요 */}
      {!isEditing && (
        <div className="flex justify-between items-center">
          <button
            onClick={handleLike}
            className="px-4 py-1 border border-gray-300 rounded hover:bg-black hover:text-white"
          >
            👍 좋아요 {likes}
          </button>
        </div>
      )}

      <div className="flex justify-end gap-2">
        {/* 신고하기 버튼은 항상 보임 */}
        <button
          onClick={() => setIsReportOpen(true)}
          className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
        >
          신고
        </button>

        {/* 작성자만 수정/삭제 가능 */}
        {isAuthor &&
          (isEditing ? (
            <button
              onClick={handleEditSubmit}
              className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              수정 완료
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
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
          ))}
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
          author={authorName}
          postTitle={title}
        />
      )}

      {/* 댓글 */}
      <CommunityComment />
    </div>
  );
};

export default CommunityBoardDetail;
