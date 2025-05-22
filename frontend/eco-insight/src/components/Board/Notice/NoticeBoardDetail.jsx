import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const NoticeBoardDetail = () => {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const navi = useNavigate();
  const [notice, setNotice] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}notice/detail`, {
      params: {
        boardNo:id,
      }
    }).then((response) => {
      setNotice(response.data);
    }).catch((error) => {
      console.log(error);
    })
  },[id])

  const handleEdit = () => {
    const boardData = {
      boardType: "notice",
      boardNo: notice.boardNo,
      memberNo: notice.memberNo,
      memberName: notice.memberName,
      boardTitle: notice.boardTitle,
      boardContent: notice.boardContent,
      categoryId: notice.categoryId,
    }
    navi(`/admin/notice/modify/${notice.boardNo}`, { state: boardData });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      axios
        .delete(`${API_URL}admin/notice`, {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
          params: {
            boardNo: id,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            alert(response.data);
            navi("/admin/noticeboard-manage");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* 제목 */}
      <div className="text-2xl font-bold">
        <h1>{notice.boardTitle}</h1>
      </div>

      {/* 작성자 */}
      <div className="text-sm text-gray-600 flex justify-between">
        <span>작성자: {notice.memberName}</span>
        <span>{notice.createdDate}</span>
      </div>

      {/* 본문 */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-4">
        <p
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: notice.boardContent }}
        ></p>
      </div>

      {/* 수정/삭제 버튼 */}
      {auth.loginInfo.memberRole === "ROLE_ADMIN" && (
        <div className="flex justify-end gap-2">
          <>
            <>
              <button
                onClick={handleEdit}
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
        onClick={() => {
          if (
            !auth.isAuthenticated ||
            !auth.loginInfo.memberRole === "ROLE_ADMIN"
          ) {
            navi("/notice");
          } else {
            navi("/admin/noticeboard-manage");
          }
        }}
        className="w-full mt-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
      >
        게시글 목록으로 돌아가기
      </button>
    </div>
  );
};

export default NoticeBoardDetail;
