import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportPage from "../ReportPage";
import { AuthContext } from "../../Context/AuthContext";

function AuthBoardDetail() {
    const navi = useNavigate();
    const { auth } = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    const [likes, setLikes] = useState(5);
    const [title, setTitle] = useState("예쁜 게시글 제목 🎉");
    const [content, setContent] = useState("게시글 본문 내용입니다.");
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);
    const [isReportOpen, setIsReportOpen] = useState(false);

    const [comments, setComments] = useState([
        { text: "첫 번째 댓글입니다.", replies: [] },
        { text: "두 번째 댓글이에요!", replies: [] },
    ]);

    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [newReply, setNewReply] = useState("");

    const handleLike = () => setLikes(likes + 1);
    const handleAddComment = () => {
    if (newComment.trim()) {
        setComments([...comments, { text: newComment.trim(), replies: [] }]);
        setNewComment("");
    }};

    const handleAddReply = (index) => {
    if (newReply.trim()) {
        const updatedComments = [...comments];
        updatedComments[index].replies.push(newReply.trim());
        setComments(updatedComments);
        setNewReply("");
        setReplyingTo(null);
    }};

    const handleSaveEdit = () => {
        setTitle(editedTitle);
        setContent(editedContent);
        setIsEditing(false);
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            alert("삭제되었습니다.");
            navi(-1);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">

        {/* 제목 */}
        <div className="text-2xl font-bold">
        {isEditing ? (
            <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
            />
        ) : (
            <h1>{title}</h1>
        )}
        </div>

        {/* 작성자 */}
        <div className="text-sm text-gray-600 flex justify-between">
            <span>작성자: 사용자123</span>
            <span>2025-04-16</span>
        </div>

        {/* 본문 */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-4">
        {isEditing ? (
            <textarea
                className="w-full h-40 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
            />
        ) : (
            <p className="whitespace-pre-wrap">{content}</p>
        )}
        <div className="border-t pt-2 text-sm text-gray-600">
            📎 첨부파일: 예시파일.png
        </div>
        </div>

        {/* 좋아요 + 댓글 수 */}
        {!isEditing && (
        <div className="flex justify-between items-center">
        <button
            onClick={handleLike}
            className="px-4 py-1 border border-gray-300 rounded hover:bg-black hover:text-white transition">
            👍 좋아요 {likes}
        </button>
        <span className="text-sm text-gray-500">
            💬 댓글 {comments.length}개
        </span>
        </div>
        )}    
    
        {/* 수정/삭제/신고 버튼 */}
        <div className="flex justify-end gap-2">
        {/* auth.isAuthenticated && */}
        {isEditing ? (
            <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
            저장
            </button>
        ) : (
            <>
                <button onClick={() => {
                    setIsEditing(true);
                    setEditedTitle(title);
                    setEditedContent(content);
                }}
                    className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100">
                수정하기
                </button>

                <button onClick={() => setIsReportOpen(true)}
                    className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100">
                신고
                </button>

                <button onClick={handleDelete}
                    className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50">
                삭제하기
                </button>
            </>
        )}
    </div>    
        {/* 댓글 목록 */}
        <div className="space-y-4">
        {comments.map((cmt, idx) => (
            <div key={idx}
                className="p-4 bg-white border border-gray-200 rounded-md space-y-2">

            <div className="flex justify-between items-center">
                <span>{cmt.text}</span>
                <button
                    onClick={() => setReplyingTo(replyingTo === idx ? null : idx)}
                    className="text-sm text-black hover:underline">
                답글 쓰기
                </button>
            </div>

            {cmt.replies.map((reply, rIdx) => (
                <div key={rIdx}
                    className="ml-4 px-3 py-2 bg-gray-100 border border-gray-300 text-sm rounded">
                ↪ {reply}
                </div>
            ))}
            {replyingTo === idx && (
                <div className="flex gap-2 mt-2 ml-4">
                <input
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="대댓글 입력"
                    className="flex-grow px-2 py-1 border border-gray-300 rounded"
                />

                <button
                    onClick={() => handleAddReply(idx)}
                    className="px-3 py-1 bg-black text-white border border-black rounded"
                >
                등록
                </button>
            </div>
            )}
        </div>
        ))}
        </div>

        {/* 댓글 작성 */}
        <div className="flex gap-2 mt-4">
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

        {/* 돌아가기 */}
        <button
            onClick={() => navi(-1)}
            className="w-full mt-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
        게시글 목록으로 돌아가기
        </button>

        {/* 신고 모달 */}
        {isReportOpen && (
        <ReportPage
            isOpen={isReportOpen}
            onClose={() => setIsReportOpen(false)}
            author={"사용자123"}
            postTitle={title}
        />
        )}
    </div>
    );
}

export default AuthBoardDetail;