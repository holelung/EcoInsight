// src/frontend/src/components/MyPage/MyPosts.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../Pagination/Pagination'; // ✅ 페이지네이션 컴포넌트 import

export default function MyPosts() {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);

  const PAGE_SIZE = 6;
  const [posts, setPosts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // ✅ 현재 페이지 상태

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navi('/login', { replace: true });
      return;
    }
    if (!auth.tokens.accessToken) return;

    setLoading(true);
    axios.get('http://localhost/mypage/myposts', {
      headers: { Authorization: `Bearer ${auth.tokens.accessToken}` }
    })
    .then(({ data }) => {
      setPosts(data.map(item => ({
        id: item.boardNo,
        categoryId: item.categoryId,
        category: item.categoryName,
        title: item.boardTitle,
        date: item.createdDate,
        views: item.viewCount
      })));
    })
    .catch(err => {
      console.error('내 게시글 조회 실패:', err);
      setError('내 게시글을 불러오는 데 실패했습니다.');
    })
    .finally(() => setLoading(false));
  }, [auth.isAuthenticated, auth.tokens.accessToken, navi]);

  if (!auth.isAuthenticated) return <div className="p-8 text-center">로그인 정보 확인 중…</div>;
  if (loading) return <div className="p-8 text-center">내 게시글을 불러오는 중…</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  const categories = ['전체', ...new Set(posts.map(p => p.category))];
  const filtered = posts.filter(p =>
    (categoryFilter === '전체' || p.category === categoryFilter) &&
    p.title.includes(keyword)
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIdx = currentPage * PAGE_SIZE;
  const displayed = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-start p-8">
      <div className="w-full max-w-5xl bg-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">내가 작성한 게시글</h2>

        {/* 필터 바 */}
        <div className="flex justify-between items-center mb-6 space-x-4">
          <select
            value={categoryFilter}
            onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(0); }}
            className="border px-3 py-2 rounded"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="text"
            placeholder="제목 검색"
            value={keyword}
            onChange={e => { setKeyword(e.target.value); setCurrentPage(0); }}
            className="border px-3 py-2 rounded flex-1"
          />
        </div>

        {/* 게시글 테이블 */}
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
            {displayed.map((p, i) => (
              <tr
                key={p.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => navi(`/post/${p.categoryId}/${p.id}`)}
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
                <td colSpan="5" className="py-4 text-gray-500">작성된 게시글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        
      </div>
    </div>
  );
}
