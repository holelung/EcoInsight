import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const dummyData = [
    {
        no: 1,
        title: "인증샷 올려요!",
        writer: "gunam90",
        createdDate: "2025.04.18",
        content: "내용"
    },
    {
        no: 2,
        title: "오늘도 인증 성공",
        writer: "minji23",
        createdDate: "2025.04.17",
        content: "내용"
    },
    {
        no: 3,
        title: "이건 좀 자랑하고 싶어요",
        writer: "sunny",
        createdDate: "2025.04.16",
        content: "내용"
    },
    {
        no: 4,
        title: "꾸준함이 답이다",
        writer: "hoya",
        createdDate: "2025.04.15",
        content: "내용"
    },
    {
        no: 5,
        title: "뉴비 첫 인증입니다!",
        writer: "newbie",
        createdDate: "2025.04.14",
        content: "내용"
    },
    {
        no: 6,
        title: "도전 100일!",
        writer: "prouser",
        createdDate: "2025.04.13",
        content: "내용"
    },
    {
        no: 7,
        title: "일상 공유",
        writer: "dailyjoy",
        createdDate: "2025.04.12",
        content: "내용"
    },
    {
        no: 8,
        title: "또 성공!",
        writer: "minji23",
        createdDate: "2025.04.11",
        content: "내용"
    },
    {
        no: 9,
        title: "진짜 힘들었어요ㅠㅠ",
        writer: "gunam90",
        createdDate: "2025.04.10",
        content: "내용"
    },
    {
        no: 10,
        title: "보람찬 하루!",
        writer: "happyday",
        createdDate: "2025.04.09",
        content: "내용"
    },
    {
        no: 11,
        title: "333",
        writer: "happadfjadfjadyday",
        createdDate: "2025.04.08",
        content: "내용"
    },
    {
        no: 12,
        title: "2빠다",
        writer: "dahsafd",
        createdDate: "2025.04.08",
        content: "내용"
    },
    {
        no: 13,
        title: "1빠다",
        writer: "fxcker",
        createdDate: "2025.04.07",
        content: "내용"
    },
];

const PAGE_SIZE = 6;

const AuthListPage = () => {
    const navi = useNavigate();
    const [boards, setBoards] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const start = page * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const nextSlice = dummyData.slice(start, end);
        setBoards((prev) => [...prev, ...nextSlice]);
    }, [page]);

    const loadMoreHandler = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center">인증 게시판</h1>
            <p className="text-center text-gray-600 mt-2">
                인증 게시판에 대한 정보를 담아서 <br /> 두줄로 적어보아요
            </p>

            {/* 검색 / 글쓰기 버튼 */}
            <div className="flex justify-center mt-6 space-x-2">
                <input type="text" placeholder="검색할 내용을 입력해주세요." className="border px-4 py-2 rounded w-1/2" />
                <button className="bg-gray-300 px-4 py-2 rounded cursor-pointer" onClick={() => navi("/boards/search")}>검색</button>
                <button className="bg-gray-300 px-4 py-2 rounded cursor-pointer" onClick={() => navi("/board/cert:type")}>글쓰기</button>
            </div>

            {/* 게시글 목록 */}
            <div className="overflow-y-auto mt-8 border rounded-xl p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {boards.map((board) => (
                        <div
                            key={board.no}
                            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer hover:border-2 hover:border-lime-400"
                            onClick={() => navi(`/board/cert/${board.no}`, { state: { post: board } })} // state 전달
                        >
                            <div className="bg-blue-100 flex items-center justify-center h-40">이미지</div>
                            <div className="px-4 py-2 border-t text-center text-sm text-blue-800 font-semibold">
                                {board.title}
                            </div>
                            <div className="px-4 py-3 text-sm">
                                <div className="text-gray-500 flex justify-between mt-1">
                                    <span>작성자: {board.writer}</span>
                                    <span>작성일: {board.createdDate}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 더보기 버튼 */}
            {boards.length < dummyData.length && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={loadMoreHandler}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 cursor-pointer hover:border-2 hover:border-lime-400">
                        더보기 ∇
                    </button>
                </div>
            )}
        </div>
    );
};


export default AuthListPage;