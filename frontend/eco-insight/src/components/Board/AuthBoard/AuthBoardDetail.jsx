import { useContext, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReportPage from "../ReportPage";
import AuthBoardComment from "../../Comment/AuthBoardComment/AuthBoardComment";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

function AuthBoardDetail() {
    const { auth, user } = useContext(AuthContext);
    const navi = useNavigate();
    const location = useLocation();
    const post = location.state?.post;
    const { no } = useParams(); // 'no' 파라미터 값 가져오기
    const [isEditing, setIsEditing] = useState(false);
    const [likes, setLikes] = useState(5);
    const [hasLiked, setHasLiked] = useState(false); // 토글 상태 저장
    const [likedUsers, setLikedUsers] = useState([]);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [isReportOpen, setIsReportOpen] = useState(false);

    const fetchPostDetails = async () => {
        try {
            const response = await axios.get(`/api/posts/${no}`);  // 실제 API 엔드포인트로 수정 필요
            setPost(response.data);
        } catch (err) {
            setError("게시물을 불러오는 데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };  
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
                    <h1>{title}</h1>
                )}
            </div>
            <div className="text-sm flex justify-between">
                <span>
                    작성자 : <span className="text-black-800 font-bold">{post.writer}</span>
                </span>
                <span>{post.createdDate}</span>
            </div>
            <div className="p-4 bg-gray-50 border rounded-md">
                {isEditing ? (
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-40 p-2 border rounded" />
                ) : (
                    <p className="whitespace-pre-wrap">{content}</p>
                )}
            </div>
            <div className="flex justify-between items-center">
                <button
                    onClick={handleLike} className={`px-4 py-1 border-none rounded transition cursor-pointer
                    ${hasLiked ? "font-bold text-blue-600" : ""}`}>
                    👍 {likes}
                </button>
            </div>  
            <div className="flex justify-end gap-2">
                {isEditing ? (
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-black text-white rounded cursor-pointer">저장</button>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="px-4 py-2 border rounded hover:bg-green-100 cursor-pointer">수정하기</button>
                        <button onClick={() => setIsReportOpen(true)} className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-100 cursor-pointer">신고</button>
                        <button className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-100 cursor-pointer">삭제하기</button>
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
            <AuthBoardComment postId={post.no} user={user} />

            <button onClick={() => navi(-1)} className="w-full mt-6 py-2 border rounded hover:bg-gray-100 cursor-pointer">
                게시글 목록으로 돌아가기
            </button>
        </div>
    );
}

export default AuthBoardDetail;