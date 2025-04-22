import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReportPage from "../ReportPage";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

function AuthBoardDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state?.post;

    if (!post) {
        return (
            <div className="text-center mt-20 text-gray-500">
                유효하지 않은 접근입니다. <br />
                <button
                    onClick={() => navigate(-1)}
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

    const handleLike = () => setLikes(likes + 1);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
            {/* 제목 */}
            <div className="text-2xl font-bold">
                {isEditing ? (
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1>{title}</h1>
                )}
            </div>

            {/* 작성자 */}
            <div className="text-sm text-gray-600 flex justify-between">
                <span>작성자: {post.writer}</span>
                <span>{post.createdDate}</span>
            </div>

            {/* 본문 */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-4">
                {isEditing ? (
                    <textarea
                        className="w-full h-40 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                ) : (
                    <p className="whitespace-pre-wrap">{content}</p>
                )}
            </div>

            {/* 좋아요 버튼 */}
            <div className="flex justify-between items-center">
                <button
                    onClick={handleLike}
                    className="px-4 py-1 border border-gray-300 rounded hover:bg-black hover:text-white transition">
                    👍 좋아요 {likes}
                </button>
            </div>

            {/* 수정/삭제/신고 버튼 */}
            <div className="flex justify-end gap-2">
                {isEditing ? (
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                        저장
                    </button>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100">
                            수정하기
                        </button>
                        <button className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100">
                            신고
                        </button>
                        <button className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50">
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
        </div>
    );
}

export default AuthBoardDetail;