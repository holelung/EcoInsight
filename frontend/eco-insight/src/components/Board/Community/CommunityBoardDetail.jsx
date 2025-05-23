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

  const [likes, setLikes] = useState(0);
  const [communityBoard, setCommunityBoard] = useState({});
  const [isReportOpen, setIsReportOpen] = useState(false);
  const API_URL = window.ENV?.API_URL;


  const fetchPostDetail = () => {
    axios
      .get(`${API_URL}communities/community-detail`, {
        params: { boardNo, categoryId },
      })
      .then((response) => {
        const data = response.data.board;
        setCommunityBoard(data);
      })
      .catch((err) => {
        console.error("게시글 상세 조회 실패:", err);
      });
  };

  useEffect(() => {
    fetchPostDetail();
  }, [boardNo, categoryId, likes]);

  const handleLike = () => {
    if (!auth.isAuthenticated) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    axios
      .post(
        `${API_URL}communities/like`,
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
        setLikes(response.data);
      })
      .catch((err) => {
        console.error("좋아요 처리 실패:", err);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    axios
      .delete(`${API_URL}communities/community-delete`, {
        data: {
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
    !!communityBoard.memberId &&
    String(auth.loginInfo.username) === String(communityBoard.memberId);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* 제목 */}
      <div className="text-2xl font-bold">{communityBoard.boardTitle}</div>

      {/* 작성자 */}
      <div className="text-sm text-gray-600 flex justify-between">
        <span>작성자: {communityBoard.memberName}</span>
        <span>{communityBoard.createdDate}</span>
      </div>

      {/* 본문 */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-4">
        <div
          dangerouslySetInnerHTML={{ __html: communityBoard.boardContent }}
        />
      </div>

      {/* 좋아요 */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleLike}
          className="px-4 py-1 border border-gray-300 rounded hover:bg-black hover:text-white"
        >
          👍 좋아요 {communityBoard.likeCount}
        </button>
      </div>

      {/* 신고, 수정, 삭제 */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsReportOpen(true)}
          className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
        >
          신고
        </button>

        {isAuthor && (
          <>
            <button
              onClick={() =>
                navigate(`/community/modify/${boardNo}`, {
                  state: communityBoard,
                })
              }
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
          author={communityBoard.memberId}
          postTitle={communityBoard.boardTitle}
        />
      )}

      {/* 댓글 */}
      <CommunityComment boardNo={boardNo} />
    </div>
  );
};

export default CommunityBoardDetail;
