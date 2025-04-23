import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReportPage from "../ReportPage";
import AuthBoardComment from "../../Comment/AuthBoardComment/AuthBoardComment";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

function AuthBoardDetail() {
    const navi = useNavigate();
    const location = useLocation();
    const post = location.state?.post;
    const { user } = useContext(AuthContext);

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

    const [isEditing, setIsEditing] = useState(false);
    const [likes, setLikes] = useState(5);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleLike = () => setLikes((prev) => prev + 1);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
            <div className="text-2xl font-bold">
                {isEditing ? (
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded" />
                ) : (
                    <h1>{title}</h1>
                )}
            </div>

            <div className="text-sm text-gray-600 flex justify-between">
                <span>작성자: {post.writer}</span>
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
                <button onClick={handleLike} className="px-4 py-1 border rounded hover:bg-black hover:text-white transition">
                    👍 좋아요 {likes}
                </button>
            </div>

            <div className="flex justify-end gap-2">
                {isEditing ? (
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-black text-white rounded">저장</button>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="px-4 py-2 border rounded">수정하기</button>
                        <button className="px-4 py-2 border rounded">신고</button>
                        <button className="px-4 py-2 border border-red-500 text-red-600 rounded">삭제하기</button>
                    </>
                )}
            </div>

            <AuthBoardComment postId={post.no} user={user} />

            <button onClick={() => navi(-1)} className="w-full mt-6 py-2 border rounded hover:bg-gray-100">
                게시글 목록으로 돌아가기
            </button>
        </div>
    );
}

export default AuthBoardDetail;