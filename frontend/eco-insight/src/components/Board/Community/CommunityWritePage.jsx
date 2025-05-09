import { useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Tiptap from "../TipTap/Tiptap";
import { AuthContext } from "../../Context/AuthContext";

const CommunityWritePage = () => {
  const { type } = useParams();
  const navi = useNavigate();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("C0001");
  const imageFilesRef = useRef([]);
  const { auth } = useContext(AuthContext);

  const boardType = "community";

  const boardNames = {
    free: "자유게시판",
    qna: "질문 게시판",
    tips: "팁 게시판",
  };

  const categoryPath = {
    free: "C0001",
    qna: "C0002",
    tips: "C0003",
  };
  const boardName = boardNames[type] || "게시판";

  const handleUpload = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    const imgRegex = /<img [^>]*src="blob:([^"]+)"/g;
    let newContent = content;

    const formData = new FormData();
    formData.append("boardType", boardType);

    imageFilesRef.current.forEach((file) => {
      formData.append("files", file);
    });

    axios
      .post("http://localhost/boards/upload", formData, {
        headers: {
          Authorization: `Bearer ${auth.tokens.accessToken}`,
        },
      })
      .then((response) => {
        const uploadPaths = response.data;
        let index = 0;

        newContent = newContent.replace(imgRegex, (_, oldSrc) => {
          const newSrc = `${uploadPaths[index++]}`;
          return `<img src="${newSrc}"`;
        });

        axios
          .post(
            "http://localhost/communities/community-write",
            {
              memberNo: auth.loginInfo.memberNo,
              categoryId: categoryId,
              title: title,
              content: newContent,
              boardType: boardType,
              ...(uploadPaths &&
                uploadPaths.length > 0 && { imageUrls: uploadPaths }),
            },
            {
              headers: {
                Authorization: `Bearer ${auth.tokens.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.status);
            alert("게시글 업로드 완료");

            navi(`/community/${type}`);
          })
          .catch((error) => {
            console.log("게시글 업로드 실패", error);
            alert("게시글 업로드실패 😢");
          });
      })
      .catch((error) => {
        console.log("이미지 업로드 실패", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="mb-4 text-sm text-gray-500">{boardName}</div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        placeholder="제목을 입력하세요"
      />

      <div className="text-m mb-3 p-2">
        <label htmlFor="communityType">카테고리</label>
        <select
          name="communityType"
          id="communityType"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="p-3 mx-2 font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <option value="C0001">자유 게시판</option>
          <option value="C0002">질문 게시판</option>
          <option value="C0003">팁 게시판</option>
        </select>
      </div>

      <Tiptap
        setContent={setContent}
        boardType={boardType}
        imageFilesRef={imageFilesRef}
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={handleUpload}
          className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-md font-bold transition"
        >
          업로드
        </button>
      </div>
    </div>
  );
};

export default CommunityWritePage;
