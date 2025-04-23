import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import axios from "axios";

// 댓글 더미 데이터
const allDummyReplies = [
    { id: 1, postId: 1, writer: "minji23", content: "멋져요!" },
    { id: 2, postId: 1, writer: "sunny", content: "화이팅!" },
    { id: 3, postId: 2, writer: "gunam90", content: "진짜 존경합니다!" },
    { id: 4, postId: 13, writer: "happadfjadfjadyday", content: "첫 댓글!" },
    { id: 5, postId: 13, writer: "dahsafd", content: "화이팅!" },
];

function AuthBoardComment({ postId, user }) {
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState("");

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
            writer: user?.name || "익명",
            content: newReply,
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
                        <div key={reply.id} className="p-3 border rounded">
                            <div className="text-gray-700 font-bold">작성자 : {reply.writer}</div>
                            <div>{reply.content}</div>
                        </div>
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
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                    등록
                </button>
            </div>
        </div>
    );
}

export default AuthBoardComment;