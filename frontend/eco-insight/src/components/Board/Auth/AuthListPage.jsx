import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AuthListPage = () => {
    const navi = useNavigate();
    const [boards, setBoards] = useState([]);
    const [page, setPage] = useState(0);

    const handleLoadMore = () => {
        setPage((page) => page + 1);
    };

    return (
    
    <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center">인증 게시판</h1>
        <p className="text-center text-gray-600 mt-2">
        인증 게시판에 대한 정보를 담아서 <br /> 두줄로 적어보아요</p>

    <div className="flex justify-center mt-6 space-x-2">
        <input type="text"
            placeholder="검색할 내용을 입력해주세요."
            className="border px-4 py-2 rounded w-1/2"/>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navi("/boards/search")}>검색</button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navi("/boards")}>글쓰기</button>
    </div>

    <div className="overflow-y-auto mt-8 max-h-[600px] border rounded-xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
        
        <div className="bg-blue-100 flex items-center justify-center h-40">
            이미지
        </div>
            <div className="px-4 py-2 border-t text-center text-sm text-blue-800 font-semibold">
                글 제목
            </div>

            <div className="px-4 py-3 text-sm">
                <div className="text-gray-500 flex justify-between mt-1">
                    <span>작성자: </span>
                    <span>작성일: </span>
                </div>
                
                <div className="text-black-500 font-bold mt-1">☆</div>
            </div>
            
        </div>
        </div>
    </div>

    
    <div className="flex justify-center mt-6">
        <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            더보기 ∇
        </button>
    </div>

    </div>

    );
};

export default AuthListPage;