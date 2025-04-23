import { useState } from "react";
import dayjs from "dayjs"; // 날짜 표시를 위한 dayjs

function CommentItem({ reply, replies, setReplies, user, postId, reportedReplies, setReportedReplies }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(reply.text);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [childReply, setChildReply] = useState("");

    // 대댓글은 parentId가 같은 댓글들을 찾아서 렌더링
    const children = replies.filter(r => r.parentId === reply.id);

    const handleUpdate = () => {
        const updated = { ...reply, text: editedText };
        setReplies(replies.map(r => r.id === reply.id ? updated : r));
        setIsEditing(false);
    };

    const handleDelete = () => {
        setReplies(replies.filter(r => r.id !== reply.id && r.parentId !== reply.id));
    };

    const handleLike = () => {
        setReplies(
            replies.map(r =>
                r.id === reply.id ? { ...r, likes: (r.likes || 0) + 1 } : r
            )
        );
    };

    const handleReply = () => {
        // 대댓글 내용이 비어있지 않은지 확인
        if (!childReply.trim()) return;
    
        const replyToAdd = {
            id: Date.now(), // ID는 유니크하도록 생성
            author: user?.name || "익명",
            text: childReply,
            parentId: reply.id,
            likes: 0,
            createdAt: new Date().toISOString(), // 대댓글에도 createdAt 추가
        };
    
        // 상태가 이전 상태를 기반으로 업데이트되도록 수정
        setReplies(prevReplies => {
            // 이미 동일한 대댓글이 존재하는지 체크
            if (prevReplies.some(reply => reply.id === replyToAdd.id)) {
                return prevReplies; // 중복 댓글은 추가하지 않음
            }
            return [...prevReplies, replyToAdd];
        });
    
        setChildReply("");  // 대댓글 입력창 비우기
        setShowReplyInput(false);  // 대댓글 입력창 숨기기
    };

    // 댓글 신고 처리
    const handleReport = () => {
        // 신고된 댓글인지 확인하고, 이미 신고된 댓글은 신고하지 않도록 처리
        if (reportedReplies.includes(reply.id)) {
            alert("이미 신고된 댓글입니다.");
            return;
        }
    
        const confirmReport = window.confirm("이 댓글을 신고하시겠습니까?");
        if (confirmReport) {
            setReportedReplies(prev => [...prev, reply.id]);
            alert("댓글이 신고되었습니다.");
        }
    };

    return (
        <div className="ml-4 border-l pl-4">
            <div className="p-2 bg-gray-50 border rounded space-y-1">
                <div className="text-sm font-medium">
                    {reply.author}
                    <span>{dayjs(reply.createdAt).format(" (YYYY/MM/DD HH:mm)")}</span> {/* 날짜 표시 */}
                </div>
                {reportedReplies.includes(reply.id) ? (
                    <div className="text-sm text-red-600">신고된 댓글입니다</div>
                ) : isEditing ? (
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
                    <button
                        onClick={handleLike}
                        className="cursor-pointer"
                    >
                        👍 {reply.likes || 0}
                    </button>
                    {user?.name === reply.author && (
                        <>
                            <button onClick={() => setIsEditing(true)}>수정</button>
                            <button onClick={handleDelete}>삭제</button>
                        </>
                    )}
                    <button
                        onClick={() => setShowReplyInput(!showReplyInput)}
                        className="font-bold cursor-pointer"
                    >
                        답글
                    </button>
                    {/* 신고 버튼 */}
                    <button onClick={handleReport} className="text-red-600 font-bold cursor-pointer">신고</button>
                </div>
                {showReplyInput && (
                    <div className="mt-2">
                        <input
                            value={childReply}
                            onChange={(e) => setChildReply(e.target.value)}
                            className="w-full p-1 border rounded"
                            placeholder="답글 입력..."
                        />
                        <button onClick={handleReply} className="mt-1 text-sm text-blue-600 cursor-pointer">등록</button>
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
                            reportedReplies={reportedReplies}  // 대댓글에도 신고 기능 전달
                            setReportedReplies={setReportedReplies}  // 대댓글에도 신고 기능 전달
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentItem;