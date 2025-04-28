import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
     useEffect(() => {
       if (!auth.isAuthenticated) {
         navigate('/login', { replace: true });
       }
     }, [auth.isAuthenticated, navigate]);

  // 로그인된 유저 정보 (예시)
  const userInfo = {
    name: '홍길동',
    username: 'hong123',
    membership: 'VIP',
    joinDate: '2025-01-01', 
    memUsage: '사용중',
    point: '50000point'   // 임의 값
  };

  const handleViewEditInfo = () => {
    navigate('/mypage/editprofile');
  };

  const handleBoardList = () => {
    navigate('/mypage/myposts');
  };
  const handleChangePassword = () => {
    navigate('/mypage/changepassword');
  };

  const handleWithdrawal = () => {
    navigate('/mypage/withdrawal/check');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* 상단 제목 + 버튼들 */}
      <div className="max-w-6xl mx-auto text-center py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          {userInfo.name}님의 마이페이지
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={handleViewEditInfo}
            className="px-4 py-2 bg-lime-400 text-white rounded-lg shadow hover:bg-green-600 transition-colors"
          >
            내정보 조회/수정
          </button>
          <button
            onClick={handleBoardList}
            className="px-4 py-2 bg-lime-400 text-white rounded-lg shadow hover:bg-green-600 transition-colors"
          >
            내가 작성한 게시글 조회
          </button>
          <button
            onClick={handleChangePassword}
            className="px-4 py-2 bg-lime-400 text-white rounded-lg shadow hover:bg-green-600 transition-colors"
          >
            비밀번호 변경
          </button>
          <button
            onClick={handleWithdrawal}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
          >
            회원탈퇴
          </button>
        </div>
      </div>

      {/* 대시보드 영역 */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        {/*
          1) 첫 번째 카드: 사용자 정보
          2) 나머지 8개 카드: 대시보드(차트) 등
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* === 1. 사용자 정보 카드 === */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
            {/* 상단 영역: 유저 정보, 프로필/아이콘 자리(예시) */}
            <div className="flex justify-between items-start mb-4">
              <div>
                {/* 예: 이름 */}
                <p className="text-gray-500 text-sm">이름</p>
                <p className="text-xl font-semibold text-gray-800">{userInfo.name}</p>
              </div>
              {/* 오른쪽 위 이미지(임시) */}
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
            </div>

            {/* 중간 영역: 사용자명, 가입일, NMI, MEM 등 */}
            <div className="flex flex-col space-y-15 mb-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">아이디</p>
                  <p className="text-base text-gray-700">{userInfo.username}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">가입일</p>
                  <p className="text-base text-gray-700">{userInfo.joinDate}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                    <p className="text-gray-500 text-sm">등급</p>
                    <p className="text-base text-gray-700">{userInfo.membership}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">적립포인트</p>
                    <p className="text-base text-gray-700">{userInfo.point}</p>
                  </div>
              </div>
              
            </div>

          </div>

          {/* === 2 ~ 9. 대시보드 카드들 === */}
          {/* 각 카드에 원형 차트/막대 차트/텍스트 등을 배치예정. */}
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="h-85 bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center"
            >
              {/* 예시: 차트(이미지) 자리 */}
              <div className="flex space-x-4 mb-4">
                <div className="w-16 h-16 bg-pink-200 rounded-full" />
                <div className="w-16 h-16 bg-blue-200 rounded" />
              </div>
              {/* 예시: 설명 텍스트 */}
              <p className="text-center text-gray-700 font-medium">
                여기는 대시보드처럼 보입니다.  
                <br className="hidden sm:block" />
                차트 이미지가 들어갈 예정입니다.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
