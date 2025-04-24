import { useEffect, useState, useCallback } from "react";
import CommentItem from "./CommentItem";

const allDummyReplies = [
    { id: 1, postId: 1, author: "minji23", text: "멋져요!", createdAt: "2024-04-22T09:00:00Z", parentId: null },
    { id: 2, postId: 1, author: "sunny", text: "화이팅!", createdAt: "2024-04-22T10:00:00Z", parentId: null },
    { id: 3, postId: 1, author: "gunam90", text: "감동이에요", createdAt: "2024-04-22T11:00:00Z", parentId: 1 },
    { id: 4, postId: 2, author: "junho01", text: "잘했어요", createdAt: "2024-04-23T09:00:00Z", parentId: null },
    { id: 5, postId: 3, author: "taeyoon99", text: "굳굳", createdAt: "2024-04-24T11:00:00Z", parentId: null },
    { id: 6, postId: 4, author: "gunam90", text: "감동이에요", createdAt: "2024-04-22T11:00:00Z", parentId: null },
];

function AuthBoardComment({ postId, user }) {
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState("");
    const [reportedReplies, setReportedReplies] = useState([]);

    useEffect(() => {
        setReplies(allDummyReplies.filter(r => r.postId === postId));
    }, [postId]);

    const handleSubmit = () => {
        if (!newReply.trim()) return;
        const newComment = {
            id: Date.now(),
            postId,
            parentId: null,
            author: user?.name || "익명-"+Date.now(),
            text: newReply,
            createdAt: new Date().toISOString(),
        };
        setReplies(prev => [...prev, newComment]);
        setNewReply("");
    };

    // 댓글 관련 액션 콜백들
    const handleReply = useCallback((parentId, text) => {
        const newReply = {
            id: `${parentId}-${Date.now()}`,
            postId,
            parentId,
            author: user?.name || "익명-"+Date.now(),
            text,
            createdAt: new Date().toISOString(),
        };
        setReplies(prev => [...prev, newReply]);
    }, [postId, user]);

    const handleLike = useCallback((id) => {
        setReplies(prev => prev.map(r => r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r));
    }, []);

    const handleDelete = useCallback((id) => {
        setReplies(prev => prev.filter(r => r.id !== id && r.parentId !== id));
    }, []);

    const handleUpdate = useCallback((id, text) => {
        setReplies(prev => prev.map(r => r.id === id ? { ...r, text } : r));
    }, []);

    const handleReport = useCallback((id) => {
        if (reportedReplies.includes(id)) return alert("이미 신고된 댓글입니다");
        if (window.confirm("이 댓글을 신고하시겠습니까?")) {
            setReportedReplies(prev => [...prev, id]);
        }
    }, [reportedReplies]);

    return (
        <div className="mt-10 border-t pt-4 space-y-4">
            <h3 className="text-lg font-semibold">댓글</h3>
            {replies.filter(r => r.parentId === null).map(reply => (
                <CommentItem
                    key={reply.id}
                    reply={reply}
                    replies={replies}
                    onReply={handleReply}
                    onLike={handleLike}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onReport={handleReport}
                    user={user}
                    reportedReplies={reportedReplies}
                />
            ))}

            <div className="flex gap-2 mt-4">
                <input
                    className="flex-1 border rounded px-3 py-2"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="댓글을 입력하세요"
                />
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-black text-white rounded cursor-pointer"
                >
                    등록
                </button>
            </div>
        </div>
    );
}

export default AuthBoardComment;