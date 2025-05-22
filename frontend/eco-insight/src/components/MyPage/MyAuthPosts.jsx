import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';

export default function MyAuthPosts() {
  const { auth } = useContext(AuthContext);
  const { tokens, isAuthenticated } = auth;
  const navigate = useNavigate();

  const PAGE_SIZE = 8;
  const [posts, setPosts]       = useState([]);
  const [currentPage, setPage]  = useState(0);
  const [keyword, setKeyword]   = useState('');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
    axios.get(`${API_URL}mypage/myauthposts`, {
      headers: { Authorization: `Bearer ${tokens.accessToken}` }
    })
    .then(({ data }) => {
      setPosts(data.map(item => ({
        id:       item.boardNo,
        title:    item.boardTitle,
        category: item.categoryName,
        date:     item.createdDate,
        views:    item.viewCount
      })));
    })
    .catch(err => {
      console.error('내 인증 게시글 조회 실패:', err);
      setError('인증 게시글을 불러오는 데 실패했습니다.');
    })
    .finally(() => setLoading(false));
  }, [isAuthenticated, tokens.accessToken, navigate]);

  if (loading) return <div className="p-8 text-center">로딩 중…</div>;
  if (error)   return <div className="p-8 text-center text-red-500">{error}</div>;

  const filtered   = posts.filter(p => p.title.includes(keyword));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIdx   = currentPage * PAGE_SIZE;
  const displayed  = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-start p-8">
      <div className="w-full max-w-5xl bg-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">내 인증 내역</h2>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="제목 검색"
            value={keyword}
            onChange={e => { setKeyword(e.target.value); setPage(0); }}
            className="border px-3 py-2 rounded w-1/3"
          />
        </div>

        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">제목</th>
              <th className="border px-4 py-2">카테고리</th>
              <th className="border px-4 py-2">등록일</th>
              <th className="border px-4 py-2">조회수</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((p,i) => (
              <tr
                key={p.id}
                onClick={() => navigate(`/auth-board/cert/${p.id}`)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="border px-4 py-2">{startIdx + i + 1}</td>
                <td className="border px-4 py-2">{p.title}</td>
                <td className="border px-4 py-2">{p.category}</td>
                <td className="border px-4 py-2">{p.date}</td>
                <td className="border px-4 py-2">{p.views}</td>
              </tr>
            ))}
            {displayed.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-gray-500">
                  작성된 인증 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
