import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Myposts() {
  // 페이지당 보여줄 게시글 수
  const PAGE_SIZE = 5;

  // 예시 데이터 
  const [posts, setPosts] = useState([
    { id: 1,  title: '오늘 ~~~ 한 날이었어요',           category: '자유',  date: '2025-04-15', views: 999 },
    { id: 2,  title: '자유 게시판 테스트',                 category: '질문',  date: '2025-04-14', views: 555 },
    { id: 3,  title: '이건 멋진 게시글',          category: '인증',  date: '2025-04-13', views: 123 },
    { id: 4,  title: '이것 안멋진 게시글...',   category: '팁',    date: '2025-04-12', views: 88  },
    { id: 5,  title: '이건 착한 게시글...',             category: '팁',    date: '2025-04-11', views: 76  },
    { id: 6,  title: '이건 나쁜 게시글...',    category: '인증',  date: '2025-04-10', views: 45  },
    { id: 7,  title: '환경좀 지킵시다',             category: '자유',  date: '2025-04-09', views: 150 },
    { id: 8,  title: '에너지를 아낍시다',      category: '질문',  date: '2025-04-08', views: 210 },
    { id: 9,  title: '에너지 야무지게 아낀 썰 푼다',         category: '자유',  date: '2025-04-07', views: 34  },
    { id: 10, title: '예시 데이터 아이디어가 없어요..',            category: '팁',    date: '2025-04-06', views: 98  },
    { id: 11, title: '11개는 보여줘야 버튼 작동을 보여줄수있음',             category: '인증',  date: '2025-04-05', views: 12  },
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // 실제 API 연동 시 사용
    // axios.get('/api/user/myposts')
    //   .then(response => setPosts(response.data))
    //   .catch(error => console.error('게시물 로딩 실패:', error));
  }, []);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  // 현재 페이지에 보여줄 게시글 목록
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const displayedPosts = posts.slice(startIdx, startIdx + PAGE_SIZE);

  const handleRowClick = (postId) => {
    // TODO: 게시글 상세 페이지로 이동
    // navigate(`/posts/${postId}`);
    console.log(`게시글 ${postId} 클릭`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="w-11/12 max-w-5xl bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-semibold mb-6">내 게시글</h2>
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b">No</th>
              <th className="py-3 px-4 border-b">게시물명</th>
              <th className="py-3 px-4 border-b">카테고리</th>
              <th className="py-3 px-4 border-b">등록일</th>
              <th className="py-3 px-4 border-b">조회수</th>
            </tr>
          </thead>
          <tbody>
            {displayedPosts.map((post, index) => (
              <tr
                key={post.id}
                onClick={() => handleRowClick(post.id)}
                className="cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <td className="py-2 px-4 border-b text-center">{startIdx + index + 1}</td>
                <td className="py-2 px-4 border-b text-left">{post.title}</td>
                <td className="py-2 px-4 border-b text-center">{post.category}</td>
                <td className="py-2 px-4 border-b text-center">{post.date}</td>
                <td className="py-2 px-4 border-b text-center">{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 페이징 버튼 */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-1 rounded-lg transition-colors ${
                page === currentPage
                  ? 'bg-lime-400 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Myposts;
