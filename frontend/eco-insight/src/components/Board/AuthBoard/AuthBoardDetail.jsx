import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReportPage from "../ReportPage";
import AuthBoardComment from "../../Comment/AuthBoardComment/AuthBoardComment";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const AuthBoardDetail = () =>{
    const navigate = useNavigate();
    const { boardNo, category } = useParams();
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
        axios.get("http://localhost/auth-board/board-detail",{
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
        .catch((error) => {
            console.error(error);
        });
    };
    

    useEffect(() => {
        fetchPostDetail();
    }, [boardNo, category]);

    useEffect(() => {
    }, [likes]);

    useEffect(() => {

    }, [auth, authorId]);

    const handleLike = () => {
        if (!auth.isAuthenticated){
            alert("로그인 후 이용 가능합니다.");
            return;
        }

        axios.post("http://localhost/auth-board/like",
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
        .catch((error) => {
            console.log("좋아요 처리실패 ", error);
        });
    };

    const handleEditSubmit = () => {
        axios.post("http://localhost/auth-board/auth-edit", {
            boardNo,
            category,
            title: editedTitle,
            content: editedContent,
        })
        .then(() => {
            setTitle(editedTitle);
            setContent(editedContent);
            setIsEditing(false);
        })
        .catch((error) => {
            alert("수정에 실패했습니다.");
        });
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;

        axios.delete("http://localhost/auth-board/auth-delete", {
            params: {
                boardNo: Number(boardNo),
                memberNo: Number(auth.loginInfo?.memberNo),
            },
            headers: {
                Authorization: `Bearer ${auth.tokens.accessToken}`,
            }
        })
        .then(() => {
            alert("삭제되었습니다.");
            navigate(-1);
        })
        .catch((error) => {
            console.error("삭제 실패");
        });
    };

    const isAuthor =
    !!auth.loginInfo?.username &&
    !!authorId &&
    String(auth.loginInfo.username) === String(authorId);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
            <div className="text-2xl font-bold">
                {isEditing ? (
                    <input 
                    value={editedTitle} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="w-full px-4 py-2 border rounded" />
                ) : (
                    <h1>{title}</h1>
                )}
            </div>
            <div className="text-sm flex justify-between">
                <span>
                    작성자 : <span value={authorName} 
                    className="text-black-800 font-bold">
                        {post.writer}</span>
                </span>
                <span>{post.createdDate}</span>
            </div>
            <div className="p-4 bg-gray-50 border rounded-md">
                {isEditing ? (
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-40 p-2 border rounded" />
                ) : (
                    <p className="whitespace-pre-wrap">{post.content}</p>
                )}
            </div>
            <div className="flex justify-between items-center">
                <button
                    onClick={handleLike}
                    className={`px-4 py-1 border-none rounded transition cursor-pointer ${hasLiked ? "font-bold text-blue-600" : ""}`}
                >
                    👍 {likes}
                </button>
            </div>
            <div className="flex justify-end gap-2">
                {isEditing ? (
                    <button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded cursor-pointer">저장</button>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="px-4 py-2 border rounded hover:bg-green-100 cursor-pointer">수정하기</button>
                        <button onClick={() => setIsReportOpen(true)} className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-100 cursor-pointer">신고</button>
                        {isAuthor && (
                            <button onClick={handleDelete} className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-100 cursor-pointer">삭제하기</button>
                        )}
                    </>
                )}
            </div>
            {/* 신고 모달 */}
            {isReportOpen && (
                <ReportPage
                    isOpen={isReportOpen}
                    onClose={() => setIsReportOpen(false)}
                    author={post.writer}
                    postTitle={title}
                />
            )}
            <AuthBoardComment postId={post.no} user={auth.loginInfo} />
            <button onClick={() => navi(-1)} className="w-full mt-6 py-2 border rounded hover:bg-gray-100 cursor-pointer">
                게시글 목록으로 돌아가기
            </button>
        </div>
    );
};

export default AuthBoardDetail;