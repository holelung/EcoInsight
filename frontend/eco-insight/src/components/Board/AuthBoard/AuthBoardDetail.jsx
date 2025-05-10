import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReportPage from "../ReportPage";
import AuthBoardComment from "../../Comment/AuthBoardComment/AuthBoardComment";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Separate from "../../Seperate/Seperate";

const AuthBoardDetail = () => {
  const { auth } = useContext(AuthContext);
  const { categoryId, no } = useParams(); 
  const navi = useNavigate();
  const [post, setPost] = useState({}); // 게시글 상태
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [pageState, setPageState] = useState(false);
  const [category, setCategory] = useState();

  // 게시글 상세 조회
  useEffect(() => {
    axios
      .get("http://localhost/auth-boards/detail", {
        params: {
          boardNo: no,
          categoryId: categoryId,
        },
      })
      .then((response) => {
        setPost(response.data);
        setIsAuthor(
          auth.isAuthenticated &&
            auth.loginInfo.memberNo == response.data.memberNo
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageState, ]);

  const handleEdit = () => {
    const boardData = {
        boardType: "auth",
        boardNo: post.boardNo,
        memberNo: post.memberNo,
        memberName: post.memberName,
        boardTitle: post.boardTitle,
        boardContent: post.boardContent,
        categoryId: post.categoryId,
    };
    navi(`/auth-board/modify/${post.boardNo}`, { state: boardData });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost/auth-boards`, {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
          params: {
            boardNo: no,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            alert(response.data);
            navi("/auth-board");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLike = () => {
    if (!auth.isAuthenticated) {
      const loginConfirm = window.confirm("로그인이 필요한 기능입니다!");
      if (!loginConfirm) {
        return;
      } else {
        return navi("/login");
      }
    }

    axios.post(`http://localhost/auth-boards/like`, {
      boardNo: post.boardNo,
      memberNo: post.memberNo,
    }, {
        headers: {
          Authorization: `Bearer ${auth.tokens.accessToken}`,
        }
      }
    ).then((response) => {
      if (response.status === 200) {
        alert(response.data);
        
        setPageState(!pageState);
      }
    }).catch((error) => {
      alert(error.response.data["error-message"]);
      console.error(error);
    })

  };
  
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{post.boardTitle}</h1>
      </div>
      <div className="text-sm flex justify-between">
        <span>
          작성자 :
          <span className="text-black-800 font-bold"> {post.memberName}</span>
        </span>
        <div className="flex gap-1.5">
          작성일 : {post.createdDate}
          <Separate /> 조회수 : {post.viewCount}
        </div>
      </div>
      <div className="p-4 bg-gray-50 border rounded-md">
        <p
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: post.boardContent }}
        ></p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleLike()}
            className={`px-4 py-1 border border-gray-300 rounded transition cursor-pointer`}
          >
            👍 좋아요 {post.likeCount}
          </button>
        </div>
        <div className="flex justify-end gap-2">
          {isAuthor && (
            <>
              <button
                onClick={() => handleEdit(true)}
                className="px-4 py-2 border rounded hover:bg-green-100 cursor-pointer"
              >
                수정하기
              </button>
              <button
                onClick={() => handleDelete()}
                className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-100 cursor-pointer"
              >
                삭제하기
              </button>
            </>
          )}
          <button
            onClick={() => setIsReportOpen(true)}
            className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-100 cursor-pointer"
          >
            신고
          </button>
        </div>
      </div>
      {/* 신고 모달 */}
      {isReportOpen && (
        <ReportPage
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          author={post.memberNo}
          postTitle={post.boardTitle}
        />
      )}
      <AuthBoardComment postId={post.no} user={auth.loginInfo} />
      <button
        onClick={() => navi(-1)}
        className="w-full mt-6 py-2 border rounded hover:bg-gray-100 cursor-pointer"
      >
        게시글 목록으로 돌아가기
      </button>
    </div>
  );
}

export default AuthBoardDetail;