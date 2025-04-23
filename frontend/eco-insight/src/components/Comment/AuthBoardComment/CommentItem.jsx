import { useState } from "react";
import axios from "axios";

function CommentItem({ reply, replies, setReplies, user, postId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(reply.text);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [childReply, setChildReply] = useState("");

    const children = replies.filter(r => r.parentId === reply.id);

    const handleUpdate = async () => {
        try {
            const updated = { ...reply, text: editedText };
            // await axios.put(`/api/replies/${reply.id}`, updated);
            setReplies(replies.map(r => r.id === reply.id ? updated : r));
            setIsEditing(false);
        } catch (err) {
            console.error("댓글 수정 실패:", err);
        }
    };

    const handleDelete = async () => {
        try {
            // await axios.delete(`/api/replies/${reply.id}`);
            setReplies(replies.filter(r => r.id !== reply.id && r.parentId !== reply.id));
        } catch (err) {
            console.error("댓글 삭제 실패:", err);
        }
    };

    const handleLike = () => {
        setReplies(
            replies.map(r =>
                r.id === reply.id ? { ...r, likes: (r.likes || 0) + 1 } : r
            )
        );
    };

    const handleReply = () => {
        const replyToAdd = {
            id: Date.now(),
            author: user?.username || "익명",
            text: childReply,
            parentId: reply.id,
            likes: 0,
        };
        setReplies([...replies, replyToAdd]);
        setChildReply("");
        setShowReplyInput(false);
    };

    return (
        <div className="ml-4 border-l pl-4">
            <div className="p-2 bg-gray-50 border rounded space-y-1">
                <div className="text-sm font-medium">{reply.author}</div>
                {isEditing ? (
                    <>
                        <textarea className="w-full border rounded" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                        <div className="flex gap-2">
                            <button onClick={handleUpdate} className="text-green-600">저장</button>
                            <button onClick={() => setIsEditing(false)}>취소</button>
                        </div>
                    </>
                ) : (
                    <div className="text-sm">{reply.text}</div>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <button onClick={handleLike}>👍 {reply.likes || 0}</button>
                    {user?.username === reply.author && (
                        <>
                            <button onClick={() => setIsEditing(true)}>수정</button>
                            <button onClick={handleDelete}>삭제</button>
                        </>
                    )}
                    <button onClick={() => setShowReplyInput(!showReplyInput)}>답글</button>
                </div>
                {showReplyInput && (
                    <div className="mt-2">
                        <input
                            value={childReply}
                            onChange={(e) => setChildReply(e.target.value)}
                            className="w-full p-1 border rounded"
                            placeholder="답글 입력..."
                        />
                        <button onClick={handleReply} className="mt-1 text-sm text-blue-600">등록</button>
                    </div>
                )}
            </div>

            {children.length > 0 && (
                <div className="space-y-2 mt-2">
                    {children.map(child => (
                        <CommentItem
                            key={child.id}
                            reply={child}
                            replies={replies}
                            setReplies={setReplies}
                            user={user}
                            postId={postId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentItem;