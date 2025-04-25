import { useNavigate } from "react-router-dom";
import Tiptap from "../TipTap/Tiptap";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const NoticeBoardWrite = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("N0001");
  const imageFilesRef = useRef([]);

  const boardType = "notice";

  const handleUpload = async() => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    const imgRegex = /<img [^>]*src="([^"]+)"[^>]*>/g;
    let newContent = content;

    const formData = new FormData();
    formData.append("boardType", boardType);

    imageFilesRef.current.forEach((file) => {
      formData.append("files", file);
    })

    

    axios.post("http://localhost/boards/upload", formData, {
      headers: {
        Authorization: `Bearer ${auth.tokens.accessToken}`,
      }
    }).then(response => {
      const uploadPaths = response.data;
      let index = 0;
      // src 변경
      newContent = newContent.replace(imgRegex, (_, oldSrc) => {
        const newSrc = `/uploads/${uploadPaths[index++]}`;
        return `<img src="${newSrc}"`;
      });
      
      axios
        .post(
          "http://localhost/admin/notice-write",
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
          navi(`/admin/noticeboard-manage`);
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
    <>
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <div className="text-xl mb-3 p-2">공지사항 작성</div>
        {/* 제목 입력 */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 mb-3 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          placeholder="제목을 입력하세요"
        />
        <div className="text-m mb-3 p-2 ">
          <label htmlFor="noticeType">카테고리</label>
          <select
            name="noticeType"
            id="noticeType"
            selectValue={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
            className="p-3 mx-2 font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <option value="N0001">공지</option>
            <option value="N0002">업데이트</option>
            <option value="N0003">버그수정</option>
          </select>
        </div>

        <Tiptap
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
            업로드
          </button>
        </div>
      </div>
    </>
  );
};

export default NoticeBoardWrite;
