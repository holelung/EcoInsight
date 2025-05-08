import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReportPage from "../ReportPage";
import AuthBoardComment from "../../Comment/AuthBoardComment/AuthBoardComment";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

function AuthBoardDetail() {
    const { auth } = useContext(AuthContext);
    const navi = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { no } = useParams(); // 'no' 파라미터 값 가져오기
    const [post, setPost] = useState(null); // 게시글 상태
    const [isEditing, setIsEditing] = useState(false);
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [content, setContent] = useState("");
    const [isReportOpen, setIsReportOpen] = useState(false);
    const isAuthor = auth.isAuthenticated && auth.loginInfo.username === post.writer;

    // 게시글 상세 조회
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5173/auth-board/${no}`);
                const data = response.data;
                setPost(data);
                setLikes(data.likes);
                setWriter(data.writer);
                setTitle(data.title);
                setContent(data.content);
            } catch (error) {
                console.error("게시글을 불러오는 데 실패했습니다.", error);
                alert("게시글을 불러오는 데 실패했습니다.");
            }
        };

        fetchPost();
    }, [no]);

    if (!post) {
        return (
            <div className="text-center mt-20 text-gray-500">
                유효하지 않은 접근입니다. <br />
                <button
                    onClick={() => navi(-1)}
                    className="mt-4 px-4 py-2 border rounded hover:bg-gray-100"
                >
                    뒤로가기
                </button>
            </div>
        );
    }

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5173/auth-board/${post.no}`, {
                title,
                content,
            });
            alert("수정되었습니다.");
            setIsEditing(false);
        } catch (error) {
            console.error("수정 실패", error);
            alert("수정에 실패했습니다.");
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5173/auth-board/${post.no}`);
            alert("삭제되었습니다.");
            navi("/auth-board");
        } catch (error) {
            console.error("삭제 실패", error);
            alert("삭제에 실패했습니다.");
        }
    };

    const handleLike = () => {
        if (hasLiked) {
            setLikes(prev => prev - 1); // 취소하면 -1
        } else {
            setLikes(prev => prev + 1); // 처음 누르면 +1
        }
        setHasLiked(!hasLiked); // 상태 반전
    };
    
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
            <div className="text-2xl font-bold">
                {isEditing ? (
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded" />
                ) : (
                    <h1>{post.title}</h1>
                )}
            </div>
            <div className="text-sm flex justify-between">
                <span>
                    작성자 : <span value={writer} className="text-black-800 font-bold">{post.writer}</span>
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
}

export default AuthBoardDetail;