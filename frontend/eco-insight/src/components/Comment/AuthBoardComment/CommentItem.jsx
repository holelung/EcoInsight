import { useState, memo } from "react";
import dayjs from "dayjs";
import ReportPage from "../../Board/ReportPage";

const CommentItem = memo(function CommentItem({
    reply,
    replies,
    onReply,
    onLike,
    onDelete,
    onUpdate,
    onReport,
    user,
    reportedReplies // 부모로부터 받아온 prop
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(reply.text);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [childReply, setChildReply] = useState("");

    const children = replies.filter(r => r.parentId === reply.id);

    const handleReplySubmit = () => {
        if (!childReply.trim()) return;
        onReply(reply.id, childReply);
        setChildReply("");
        setShowReplyInput(false);
    };

    return (
    <div className="ml-4 border-l pl-4 mt-2">
        <div className="bg-gray-100 p-2 rounded shadow-sm">
            <div>
                <span className="font-bold">{reply.author}</span>
                <span className="text-xs text-gray-500 ml-2">
                    {dayjs(reply.createdAt).format("(YYYY/MM/DD HH:mm)")}
                </span>
            </div>
        
            {reportedReplies?.includes(reply.id) ? (
                <div className="text-sm text-red-500">🚫 신고된 댓글입니다</div>
            ) : isEditing ? (
                <>
                    <textarea
                        className="w-full border rounded p-1 mt-1"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                    
                    <div className="flex gap-2 mt-1 text-xs">
                        <button onClick={() => { onUpdate(reply.id, editedText); setIsEditing(false); }} className="text-green-600">저장</button>
                        <button onClick={() => setIsEditing(false)}>취소</button>
                    </div>
                </>
            ) : (
                <p className="text-sm mt-1">{reply.text}</p>
            )}
        
            <div className="flex gap-3 mt-1 text-xs text-gray-500">
            <button onClick={() => onLike(reply.id)}>
                <span className="font-bold cursor-pointer">👍 {reply.likes || 0}</span>
            </button>
        
            {user?.name === reply.author && (
                <>
                    <button onClick={() => setIsEditing(true)}>수정</button>
                    <button onClick={() => onDelete(reply.id)}>삭제</button>
                </>
            )}
            
            <button onClick={() => setShowReplyInput(!showReplyInput)} className="cursor-pointer">답글</button>
            <button onClick={() => onReport(reply)} className="text-red-500 cursor-pointer">신고</button>
        </div>

        {showReplyInput && (
            <div className="mt-2">
                <input
                    className="w-full border rounded p-1"
                    value={childReply}
                    onChange={(e) => setChildReply(e.target.value)}
                    placeholder="답글 입력..."
                />
                <button onClick={handleReplySubmit} className="text-blue-600 text-sm mt-1 cursor-pointer">등록</button>
            </div>
        )}
        </div>

        {children.length > 0 && children.map(child => (
            <CommentItem
                key={child.id}
                reply={child}
                replies={replies}
                onReply={onReply}
                onLike={onLike}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onReport={onReport}
                user={user}
                reportedReplies={reportedReplies} // 부모에서 전달받은 prop 사용
            />
        ))}
    </div>
    );
});

export default CommentItem;
