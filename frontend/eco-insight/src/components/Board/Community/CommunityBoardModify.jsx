import { useLocation, useNavigate, useParams } from "react-router-dom";
import Tiptap from "../TipTap/Tiptap";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const CommunityBoardModify = () => {
  const { auth } = useContext(AuthContext);
  const { boardNo } = useParams();
  const navi = useNavigate();
  const location = useLocation();
  const communityBoard = location.state;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("C0001");
  const imageFilesRef = useRef([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const boardType = "community";
  const boardNames = {
    C0001: "자유 게시판",
    C0002: "질문 게시판",
    C0003: "팁 게시판",
  };

  useEffect(() => {
    if (auth.loginInfo.username !== communityBoard.memberId) {
      return navi("/community");
    }
    setTitle(communityBoard.boardTitle);
    setContent(communityBoard.boardContent);
    setCategoryId(communityBoard.categoryId);
  }, []);

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

    axios
      .post(`${API_URL}boards/upload`, formData, {
        headers: {
          Authorization: `Bearer ${auth.tokens.accessToken}`,
        },
      })
      .then((response) => {
        const uploadPaths = response.data;
        let index = 0;
        // src 변경
        newContent = newContent.replace(imgRegex, (_, oldSrc) => {
          const newSrc = `${uploadPaths[index++]}`;
          return `<img src="${newSrc}"`;
        });

        axios
          .put(
            `${API_URL}communities/community-update`,
            {
              memberNo: auth.loginInfo.memberNo,
              boardNo: boardNo,
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
            if (response.status == 200) {
              alert("게시글 수정 완료");
              navi(`/post/${categoryId}/${boardNo}`);
            }
          })
          .catch((error) => {
            console.log("게시글 수정 실패", error);
            alert("게시글 수정실패 😢");
          });
      })
      .catch((error) => {
        console.log("이미지 수정 실패", error);
      });
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <div className="text-xl mb-3 p-2">{boardNames[categoryId]} 작성</div>
        {/* 제목 입력 */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 mb-3 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          placeholder="제목을 입력하세요"
        />
        <div className="text-m mb-3 p-2 ">
          <label htmlFor="communityType">카테고리</label>
          <select
            name="communityType"
            id="communityType"
            selectValue={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
            className="p-3 mx-2 font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <option value="C0001">자유 게시판</option>
            <option value="C0002">질문 게시판</option>
            <option value="C0003">팁 게시판</option>
          </select>
        </div>

        <Tiptap
          prevContent={communityBoard.boardContent}
          setContent={setContent}
          boardType={boardType}
          imageFilesRef={imageFilesRef}
        />

        {/* 업로드 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleUpload}
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-md font-bold transition"
          >
            수정하기
          </button>
        </div>
      </div>
    </>
  );
};

export default CommunityBoardModify;
