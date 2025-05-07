import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import Pagination from '../Pagination/Pagination';

export default function Myposts() {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, tokens } = auth;

  const PAGE_SIZE = 8;
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navi('/login', { replace: true });
      return;
    }

    axios
      .get('http://localhost/mypage/myposts', {
        headers: { Authorization: `Bearer ${tokens.accessToken}` }
      })
      .then(res => {
        const formatted = res.data.posts.map(item => ({
          id:       item.boardNo,
          title:    item.boardTitle,
          category: item.categoryName,
          date:     item.createdDate,
          views:    item.viewCount
        }));
        setPosts(formatted);
      })
      .catch(err => {
        console.error('내 게시글 조회 실패:', err);
        setError('내 게시글을 불러오는 데 실패했습니다.');
      });
  }, [isAuthenticated, tokens.accessToken, navi]);

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  // 1) 카테고리 목록
  const categories = ['전체', ...new Set(posts.map(p => p.category))];

  // 2) 필터링
  const filtered = posts.filter(post => {
    const matchCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchSearch   = post.title.includes(searchKeyword);
    return matchCategory && matchSearch;
  });

  // 3) 페이지네이션 로직
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIdx   = currentPage * PAGE_SIZE;
  const displayed  = filtered.slice(startIdx, startIdx + PAGE_SIZE);  // ← 여기 선언 필수!

  const handleRowClick = id => {
    navi(`/communities/community-detail?boardNo=${id}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="w-11/12 max-w-5xl bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-semibold mb-4">내 게시글</h2>

        {/* 필터바 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <select
            value={selectedCategory}
            onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(0); }}
            className="px-3 py-2 border rounded"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            type="text"
            placeholder="제목으로 검색"
            value={searchKeyword}
            onChange={e => { setSearchKeyword(e.target.value); setCurrentPage(0); }}
            className="px-3 py-2 border rounded w-full sm:w-1/3"
          />
        </div>

        {/* 테이블 */}
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="text-gray-700">
              <th className="py-3 px-4 border-b">No</th>
              <th className="py-3 px-4 border-b">게시물명</th>
              <th className="py-3 px-4 border-b">카테고리</th>
              <th className="py-3 px-4 border-b">등록일</th>
              <th className="py-3 px-4 border-b">조회수</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((post, idx) => (
              <tr
                key={post.id}
                onClick={() => handleRowClick(post.id)}
                className="cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <td className="py-2 px-4 border-b text-center">{startIdx + idx + 1}</td>
                <td className="py-2 px-4 border-b">{post.title}</td>
                <td className="py-2 px-4 border-b text-center">{post.category}</td>
                <td className="py-2 px-4 border-b text-center">{post.date}</td>
                <td className="py-2 px-4 border-b text-center">{post.views}</td>
              </tr>
            ))}
            {displayed.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  조건에 맞는 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 페이지네이션 컴포넌트 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
