import { useEffect, useState, useCallback } from "react";
import CommentItem from "./CommentItem";
import ReportPage from "../../Board/ReportPage";

const allDummyReplies = [
    { id: 1, postId: 1, author: "minji23", text: "멋져요!", createdAt: "2024-04-22T09:00:00Z", parentId: null },
    { id: 2, postId: 1, author: "sunny", text: "화이팅!", createdAt: "2024-04-22T10:00:00Z", parentId: null },
    { id: 3, postId: 1, author: "gunam90", text: "감동이에요", createdAt: "2024-04-22T11:00:00Z", parentId: 1 },
    { id: 4, postId: 2, author: "junho01", text: "잘했어요", createdAt: "2024-04-23T09:00:00Z", parentId: null },
    { id: 5, postId: 3, author: "taeyoon99", text: "굳굳", createdAt: "2024-04-24T11:00:00Z", parentId: null },
    { id: 6, postId: 4, author: "gunam90", text: "감동이에요", createdAt: "2024-04-22T11:00:00Z", parentId: null },
];

function AuthBoardComment({ postId, user }) {
    const [commentList, setCommentList] = useState([]);
    const [newReply, setNewReply] = useState("");
    const [reportedReplies, setReportedReplies] = useState([]); // ✅ 신고된 댓글 저장
    const API_URL = import.meta.env.VITE_API_URL;

    // 신고 모달 제어
    const [reportTarget, setReportTarget] = useState(null);

    useEffect(() => {
        setCommentList(allDummyReplies.filter((r) => r.postId === postId));
    }, [postId]);

    const handleSubmit = () => {
        if (!newReply.trim()) return;
        
        const newComment = {
            id: Date.now(),
            postId,
            parentId: null,
            author: user?.name || "익명-" + Date.now(),
            text: newReply,
            createdAt: new Date().toISOString(),
        };
        setCommentList((prev) => [...prev, newComment]);
        setNewReply("");
    };

    const handleReply = useCallback((parentId, text) => {
        const reply = {
            id: `${parentId}-${Date.now()}`,
            postId,
            parentId,
            author: user?.name || "익명-" + Date.now(),
            text,
            createdAt: new Date().toISOString(),
        };
        
        setCommentList((prev) => [...prev, reply]);
    }, [postId, user]);

    const handleLike = useCallback((id) => {
        setCommentList((prev) =>
            prev.map((r) => {
                if (r.id === id) {
                    const hasLiked = r.hasLiked || false;
                    return {
                        ...r,
                        likes: hasLiked ? (r.likes || 0) - 1 : (r.likes || 0) + 1,
                        hasLiked: !hasLiked
                    };
                }
                return r;
            })
        );
    }, []);

    const handleDelete = useCallback((id) => {
        setCommentList((prev) => prev.filter((r) => r.id !== id && r.parentId !== id));
    }, []);

    const handleUpdate = useCallback((id, text) => {
        setCommentList((prev) => prev.map((r) => r.id === id ? { ...r, text } : r));
    }, []);

    const openReportModal = useCallback((reply) => {
        setReportTarget(reply);
    }, []);

    const closeReportModal = () => {
        if (reportTarget) {
          setReportedReplies(prev => [...prev, reportTarget.id]); // ✅ 신고 시 댓글 ID 저장
        }
        setReportTarget(null);
    };

    return (
        <div className="mt-10 border-t pt-4 space-y-4">
            <h3 className="text-lg font-semibold">댓글</h3>
            {commentList.filter(r => r.parentId === null).map(reply => (
                <CommentItem
                    key={reply.id}
                    reply={reply}
                    replies={commentList}
                    onReply={handleReply}
                    onLike={handleLike}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onReport={openReportModal}
                    user={user}
                    reportedReplies={reportedReplies} // ✅ 추가!
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
                className="px-4 py-2 bg-black text-white rounded cursor-pointer">
                등록
            </button>
        </div>

        {reportTarget && (
            <ReportPage
                isOpen={!!reportTarget}
                onClose={closeReportModal}
                author={reportTarget.author}
                postTitle={reportTarget.text}
            />
        )}
    </div>
    );
}

export default AuthBoardComment;