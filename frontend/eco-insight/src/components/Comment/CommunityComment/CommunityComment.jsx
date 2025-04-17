import React, { useState } from "react";

const CommunityComment = () => {
  const [comments, setComments] = useState([
    { text: "첫 번째 댓글입니다.", replies: [] },
    { text: "두 번째 댓글이에요!", replies: [] },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment.trim(), replies: [] }]);
      setNewComment("");
    }
  };

  const handleAddReply = (index) => {
    if (newReply.trim()) {
      const updated = [...comments];
      updated[index].replies.push(newReply.trim());
      setComments(updated);
      setNewReply("");
      setReplyingTo(null);
    }
  };

  return (
    <div>
      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.map((cmt, index) => (
          <div
            key={index}
            className="p-4 bg-white border border-gray-200 rounded-md space-y-2"
          >
            <div className="flex justify-between items-center">
              <span>{cmt.text}</span>
              <button
                onClick={() =>
                  setReplyingTo(replyingTo === index ? null : index)
                }
                className="text-sm text-black hover:underline"
              >
                답글 쓰기
              </button>
            </div>
            {cmt.replies.map((reply, rindex) => (
              <div
                key={rindex}
                className="ml-4 px-3 py-2 bg-gray-100 border border-gray-300 text-sm rounded"
              >
                ↪ {reply}
              </div>
            ))}
            {replyingTo === index && (
              <div className="flex gap-2 mt-2 ml-4">
                <input
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="대댓글 입력"
                  className="flex-grow px-2 py-1 border border-gray-300 rounded"
                />
                <button
                  onClick={() => handleAddReply(index)}
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
    </div>
  );
};

export default CommunityComment;
