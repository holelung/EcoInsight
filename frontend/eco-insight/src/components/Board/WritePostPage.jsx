import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate 추가
import "./WritePostPage.css";

export default function WritePostPage() {
  const { type } = useParams();
  const navigate = useNavigate(); // 페이지 이동 함수

  const boardNames = {
    free: "자유게시판",
    qna: "질문 게시판",
    tips: "팁 게시판",
  };

  const boardName = boardNames[type] || "게시판";

  // 업로드 버튼 클릭 핸들러
  const handleUpload = () => {
    alert("게시물 업로드 완료!"); // 여기에 서버로 데이터 전송 코드 들어갈 수 있음
    navigate(`/board/${type}`); // 업로드 후 해당 게시판 페이지로 이동
  };

  return (
    <div className="write-container">
      <input className="title-input" placeholder="여기는 제목이 들어갈 자리!" />
      <button className="category-button">{boardName}</button>

      {/* 에디터 영역 */}
      <div className="editor-wrapper">
        <div className="toolbar">
          <button>🔄</button>
          <select>
            <option>Paragraph text</option>
            <option>Heading</option>
          </select>
          <select>
            <option>Arial</option>
            <option>Serif</option>
            <option>Monospace</option>
          </select>
          <input type="number" min="8" max="72" defaultValue="14" />
          <button>
            <b>B</b>
          </button>
          <button>
            <i>I</i>
          </button>
          <button>
            <u>U</u>
          </button>
          <button>🔗</button>
          <button>🖼️</button>
          <button>• • •</button>
        </div>
        <textarea
          className="editor"
          placeholder={`여기는 사용자가 글을 작성하는 부분\n\n위에 있는 글 작성 관련 기능 bar는 사용하지 않을지 모를 즘은 나에게 정답을 알려줘……`}
        />
      </div>

      {/* 이미지 미리보기 영역 */}
      <div className="image-upload-area">
        <div className="image-icon">🖼️</div>
        <div className="image-preview">검정색 부분은 사진 미리보기</div>
      </div>

      {/* 업로드 버튼 */}
      <div className="submit-wrapper">
        <button className="submit-button" onClick={handleUpload}>
          업로드
        </button>
      </div>
    </div>
  );
}
