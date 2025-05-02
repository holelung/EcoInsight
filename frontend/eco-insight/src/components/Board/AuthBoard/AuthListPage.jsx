import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PAGE_SIZE = 6;

const AuthListPage = () => {
    const navi = useNavigate();
    const [option, setOption] = useState("title");
    const [keyword, setKeyword] = useState("");
    const [boards, setBoards] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchBoards(0, true); // 첫 로딩
    }, []);

    const fetchBoards = async (pageNumber, isInitial = false) => {
        try {
            const response = await axios.get("/api/auth-board/list", {
                params: {
                    page: pageNumber,
                    size: PAGE_SIZE,
                    option,
                    keyword,
                },
            });
    
            const data = response.data.content || [];
            
            if (isInitial) {
                setBoards(data);
            } else {
                setBoards((prev) => [...prev, ...data]);
            }
    
            setHasMore(data.length === PAGE_SIZE);
        } catch (error) {
            console.error("게시글 불러오기 실패", error);
            setBoards([]); // fallback
        }
    };

    const handleOnChange = (e) => {
        setOption(e.target.value);
    };

    const handleSearch = () => {
        setPage(0);
        fetchBoards(0, true);
    };

    const loadMoreHandler = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBoards(nextPage);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center">인증 게시판</h1>
            <p className="text-center text-gray-600 mt-2">
                인증 게시판에 대한 정보를 담아서 <br /> 두줄로 적어보아요
            </p>

            {/* 카테고리 / 검색 / 글쓰기 버튼 */}
            <div className="flex justify-center mt-6 space-x-2">
                <select
                    value={option}
                    onChange={handleOnChange}
                    className="border px-2 py-2 rounded text-center">
                    <option value="title">제목</option>
                    <option value="writer">작성자</option>
                    <option value="content">내용</option>
                </select>
                <input
                    type="text"
                    placeholder="검색할 내용을 입력해주세요."
                    className="border px-4 py-2 rounded w-1/2"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                    className="bg-gray-300 px-4 py-2 rounded cursor-pointer hover:border-2 hover:border-lime-400"
                    onClick={handleSearch}
                >
                    검색
                </button>
                <button
                    className="bg-gray-300 px-4 py-2 rounded cursor-pointer hover:border-2 hover:border-lime-400"
                    onClick={() => navi("/auth-board/write")}
                >
                    글쓰기
                </button>
            </div>

            {/* 게시글 목록 */}
            <div className="overflow-y-auto mt-8 border rounded-xl p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {boards.map((board) => (
                        <div
                            key={board.no}
                            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer hover:border-2 hover:border-lime-400"
                            onClick={() => navi(`/auth-board/${board.no}`, { state: { post: board } })}
                        >
                            <div className="bg-blue-100 flex items-center justify-center h-40">이미지</div>
                            <div className="px-4 py-2 border-t text-center text-sm text-blue-800 font-semibold">
                                {board.title}
                            </div>
                            <div className="px-4 py-3 text-sm">
                                <div className="flex justify-between mt-1">
                                    <span>
                                        작성자 : <span className="text-black-500 font-bold">{board.writer}</span>
                                    </span>
                                    <span>작성일 : {board.createdDate}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 더보기 버튼 */}
            {hasMore && (
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