import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function MyPosts() {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);

  const PAGE_SIZE = 8;
  const [posts, setPosts]       = useState([]);
  const [currentPage, setPage]  = useState(0);
  const [category, setCategory] = useState('전체');
  const [keyword, setKeyword]   = useState('');
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    // 1) 인증 체크
    if (!auth.isAuthenticated) {
      navi('/login', { replace: true });
      return;
    }
    // 2) 토큰 준비 전 대기
    if (!auth.tokens.accessToken) return;

    setLoading(true);
    setError(null);

    // 3) 올바른 포트(8080)로 요청
    axios.get('http://localhost/mypage/myposts', {
      headers: { Authorization: `Bearer ${auth.tokens.accessToken}` }
    })
      .then(({ data }) => {
        setPosts(
          data.map(item => ({
            id:       item.boardNo,
            title:    item.boardTitle,
            category: item.categoryName,
            date:     item.createdDate,
            views:    item.viewCount
          }))
        );
      })
      .catch(err => {
        console.error('내 게시글 조회 실패:', err);
        setError('내 게시글을 불러오는 데 실패했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    auth.isAuthenticated,
    auth.tokens.accessToken,
    navi
  ]);

  // 인증 대기
  if (!auth.isAuthenticated) {
    return <div className="p-8 text-center">로그인 정보 확인 중…</div>;
  }
  // 로딩 중
  if (loading) {
    return <div className="p-8 text-center">내 게시글을 불러오는 중…</div>;
  }
  // 에러 발생
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  // 필터링 & 페이징
  const cats     = ['전체', ...new Set(posts.map(p => p.category))];
  const filtered = posts.filter(p =>
    (category === '전체' || p.category === category) &&
    p.title.includes(keyword)
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIdx   = currentPage * PAGE_SIZE;
  const displayed  = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-start p-8">
      <div className="w-full max-w-5xl bg-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">내가 작성한 게시글</h2>

        {/* 필터 바 */}
        <div className="flex justify-between items-center mb-6 space-x-4">
          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setPage(0); }}
            className="border px-3 py-2 rounded"
          >
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="text"
            placeholder="제목 검색"
            value={keyword}
            onChange={e => { setKeyword(e.target.value); setPage(0); }}
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
                onClick={() => navi(`/post/${encodeURIComponent(p.category)}/${p.id}`)}
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
                  작성된 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}
