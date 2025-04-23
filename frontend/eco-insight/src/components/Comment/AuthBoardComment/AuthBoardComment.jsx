import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import axios from "axios";

function AuthBoardComment({ postId, user }) {
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState("");

    useEffect(() => {
        if (!postId) return;
        axios.get(`/api/comments?postId=${postId}`)
            .then(res => setReplies(res.data))  // 받아온 댓글 데이터를 replies에 배열로 저장
            .catch(err => console.error("댓글 불러오기 오류", err));
    }, [postId]);

    const handleReplySubmit = () => {
        if (!newReply.trim()) return;
        axios.post("/api/comments", {
            postId,
            writer: user?.name || "익명",
            content: newReply,
        })
            .then((res) => {
                setReplies([...replies, res.data]);  // 새 댓글을 replies 배열에 추가
                setNewReply("");
            })
            .catch((err) => console.error("댓글 등록 오류", err));
    };

    return (
        <div className="mt-10 border-t pt-4 space-y-4">
            <h3 className="text-lg font-semibold">댓글</h3>
            <div className="space-y-2">
                {replies.length > 0 ? (
                    replies.map(reply => (
                        <div key={reply.id} className="p-3 border rounded">
                            <div className="text-sm text-gray-700">{reply.writer}</div>
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