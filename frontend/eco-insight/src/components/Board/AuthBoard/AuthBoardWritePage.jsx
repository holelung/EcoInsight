import { useContext, useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tiptap from "../TipTap/Tiptap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function AuthBoardWritePage() {
    const navi = useNavigate();
    const imageFilesRef = useRef([]);
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [boardType, setBoardType] = useState("");
    const { auth } = useContext(AuthContext);

    const handleOnChange = (e) => { setOption(e.target.value); };

    useEffect(() => {
        if (!auth.isAuthenticated) {
            alert("로그인이 필요한 서비스입니다.");
            navi("/login");
        }
    }, [auth, navi]);

    const handleUpload = async () => {
        if (!title.trim() || !content.trim() || !category) {
            alert("제목, 카테고리, 내용을 모두 입력해주세요!");
            return;
        }
        if (!imageFilesRef[0]){
            alert("이미지 첨부는 필수 입니다.");
            return;
        }

        const postData = {
            categoryId: category,
            title,
            content,
            imageUrls: imageFilesRef.current || []
        };
        console.log("전송할 데이터:", postData);
        axios.post("http://localhost/auth-board", postData, {
            headers: {
                Authorization: `Bearer ${auth.tokens.accessToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log(response.status);
            alert("게시글 업로드 완료");

            navi(`/auth-board/authBoardNo=${response.data.boardNo}`);
        })
        .catch((error) => {
            console.log(error);
            alert("게시글 업로드 실패");
        });
    };

    if (!auth.isAuthenticated) {
        return null;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <div className="mb-4 text-sm text-gray-500">인증게시판</div>

        {/* 카테고리 */}
        <div>
            <select
                value={category}
                defaultValue="category"
                onChange={(e) => setCategory(e.target.value)}
                className="mb-3 border px-11 py-2 rounded">
                <option value="category">카테고리 선택</option>
                <option value="AUTH_01">인증1</option>
                <option value="AUTH_02">인증2</option>
                <option value="AUTH_03">인증3</option>
                <option value="AUTH_04">인증4</option>
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
