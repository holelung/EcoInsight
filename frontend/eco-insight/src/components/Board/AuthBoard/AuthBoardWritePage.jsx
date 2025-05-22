import { useContext, useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tiptap from "../TipTap/Tiptap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const AuthBoardWritePage = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("A0001");
  const imageFilesRef = useRef([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const boardType = "auth";

  useEffect(() => {
    if (!auth.isLoading &&!auth.isAuthenticated) {
      alert("로그인이 필요한 서비스입니다.");
      navi("/login");
    }
  }, [auth.isAuthenticated]);

  const handleUpload = () => {
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

    axios.post("http://localhost/boards/upload", formData, {
      headers: {
        Authorization: `Bearer ${auth.tokens.accessToken}`,
      }
    }).then(response => {
      const uploadPaths = response.data;
      let index = 0;
      // src 변경
      newContent = newContent.replace(imgRegex, (_, oldSrc) => {
        const newSrc = `${uploadPaths[index++]}`;
        return `<img src="${newSrc}"`;
      });
      
      axios
        .post(
          "http://localhost/auth-boards",
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
          if(response.status == 201){
            alert("게시글 업로드 완료");
            navi(`/auth-board`);
          }
        })
        .catch((error) => {
          console.log("게시글 업로드 실패", error);
          alert("게시글 업로드실패 😢");
        });
    }).catch(error => {
      console.log("이미지 업로드 실패", error);
    })
  };


  return (
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="mb-4 text-sm text-gray-500">인증게시판</div>

      {/* 카테고리 */}
      <div>
          <select
              selectValue={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mb-3 border px-11 py-2 rounded">
              <option value="A0001">인증1</option>
              <option value="A0002">인증2</option>
              <option value="A0003">인증3</option>
          </select>
      </div>
      
      {/* 제목 입력 */}
      <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요"
          className="w-full p-4 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
      />

      {/* 텍스트 에디터 */}
      <Tiptap 
          setContent={setContent}
          boardType={boardType}
          imageFilesRef={imageFilesRef}/>

      {/* 업로드 버튼 */}
      <div className="mt-4 flex justify-end">
          <button
              onClick={handleUpload}
              className="bg-lime-400 hover:bg-green-600 text-white px-6 py-2 rounded-md font-bold transition">
              업로드
          </button>
      </div>
  </div>
);
}

export default AuthBoardWritePage;