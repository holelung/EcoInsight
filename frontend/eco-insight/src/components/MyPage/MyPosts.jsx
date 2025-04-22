import React from 'react';

function Myposts() {
  // 예시 데이터 (실제 데이터는 API 등에서 받아올 수 있음)
  const posts = [
    { id: 1, title: '오늘 ~~~ 한 날이었어요', author: '20xx.xx.xx', date: '2025-04-15', views: 999 },
    { id: 2, title: '자유 게시판 테스트', author: '20xx.xx.xx', date: '2025-04-14', views: 555 },
    { id: 3, title: '환경사랑 녹색 캠페인 참여', author: '20xx.xx.xx', date: '2025-04-13', views: 123 },
    { id: 4, title: '배출가스 줄이기 운동, 동참하세요!', author: '20xx.xx.xx', date: '2025-04-12', views: 88 },
  ];

  const handleRowClick = (postId) => {
    // 게시글 상세 페이지로 이동하는 로직을 추가할 수 있음
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
              <th className="py-3 px-4 border-b">작성자</th>
              <th className="py-3 px-4 border-b">등록일</th>
              <th className="py-3 px-4 border-b">조회수</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                key={post.id}
                onClick={() => handleRowClick(post.id)}
                className="cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-left">{post.title}</td>
                <td className="py-2 px-4 border-b text-center">{post.author}</td>
                <td className="py-2 px-4 border-b text-center">{post.date}</td>
                <td className="py-2 px-4 border-b text-center">{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Myposts;
