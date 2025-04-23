import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import axios from "axios";

// 댓글 더미 데이터
const allDummyReplies = [
    { id: 1, postId: 1, author: "minji23", text: "멋져요!", createdAt: "2024-04-22T09:00:00Z", parentId: null },
    { id: 2, postId: 1, author: "sunny", text: "화이팅!", createdAt: "2024-04-22T10:00:00Z", parentId: null },
    { id: 3, postId: 2, author: "gunam90", text: "진짜 존경합니다!", createdAt: "2024-04-22T11:00:00Z", parentId: null },
    { id: 4, postId: 13, author: "happadfjadfjadyday", text: "첫 댓글!", createdAt: "2024-04-22T12:00:00Z", parentId: null },
    { id: 5, postId: 13, author: "dahsafd", text: "화이팅!", createdAt: "2024-04-22T13:00:00Z", parentId: null },
];

function AuthBoardComment({ postId, user }) {
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState("");
    const [reportedReplies, setReportedReplies] = useState([]);  // 신고된 댓글 리스트

    useEffect(() => {
        if (!postId) return;
        const filtered = allDummyReplies.filter(reply => reply.postId === postId);
        setReplies(filtered);
    }, [postId]);

    const handleReplySubmit = () => {
        if (!newReply.trim()) return;

        const newComment = {
            id: Date.now(),
            postId,
            author: user?.name || "익명",
            text: newReply,
            createdAt: new Date().toISOString(),
            parentId: null,  // 최상위 댓글인 경우 parentId는 null
        };

        setReplies(prev => [...prev, newComment]);
        setNewReply("");
    };

    return (
        <div className="mt-10 border-t pt-4 space-y-4">
            <h3 className="text-lg font-semibold">댓글</h3>
            <div className="space-y-2">
                {replies.length > 0 ? (
                    replies.map(reply => (
                        <CommentItem
                            key={reply.id}
                            reply={reply}
                            replies={replies}
                            setReplies={setReplies}
                            user={user}
                            postId={postId}
                            reportedReplies={reportedReplies}  // 신고된 댓글 목록 전달
                            setReportedReplies={setReportedReplies}  // 신고된 댓글 목록 업데이트
                        />
                    ))
                ) : (
                    <p className="text-gray-500">아직 댓글이 없습니다.</p>
                )}
            </div>
            <div className="flex gap-2 mt-4">
                <input
                    className="flex-1 border rounded px-3 py-2"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="댓글을 입력하세요"
                />
                <button
                    onClick={handleReplySubmit}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer"
                >
                    등록
                </button>
            </div>
        </div>
    );
}

export default AuthBoardComment;