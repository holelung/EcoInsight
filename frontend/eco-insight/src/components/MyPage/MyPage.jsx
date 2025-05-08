import { useContext, useEffect, useState } from 'react';
import { AuthContext }           from '../Context/AuthContext';
import { useNavigate }           from 'react-router-dom';
import axios                     from 'axios';

export default function MyPage() {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    membership: '',
    joinDate: '',
    point: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1) 로그인/토큰 검사 후 정보 조회
 

  // 마운트 및 auth/tokens 변경 시 fetchUserInfo 호출
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navi('/login', { replace: true });
      return;
    }

    setLoading(true);
    setError(null);

    if(auth.tokens.accessToken){
    axios
      .get('http://localhost/mypage', {
        headers: { Authorization: `Bearer ${auth.tokens.accessToken}` }
      })
      .then(({ data }) => {
        setUserInfo({
          name:       data.memberName,
          username:   data.memberId,
          membership: data.grade,
          joinDate:   new Date(data.enrollDate)
                         .toLocaleDateString('ko-KR', {
                           year: 'numeric',
                           month: '2-digit',
                           day: '2-digit'
                         }),
          point:      `${Number(data.point || 0).toLocaleString()} point`
        });
      })
      .catch((err) => {
        console.error('정보 조회 실패:', err);
        setError('정보를 불러오는 데 실패했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [auth.tokens.accessToken, ]);

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* 상단 버튼들 */}
      <div className="max-w-6xl mx-auto text-center py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          {userInfo.name}님의 마이페이지
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => navi('/mypage/editprofile')}
            className="px-4 py-2 bg-lime-400 text-white rounded-lg shadow hover:bg-green-600 transition-colors"
          >
            내정보 조회/수정
          </button>
          <button
            onClick={() => navi('/mypage/myposts')}
            className="px-4 py-2 bg-lime-400 text-white rounded-lg shadow hover:bg-green-600 transition-colors"
          >
            내가 작성한 게시글 조회
          </button>
          <button
            onClick={() => navi('/mypage/changepassword')}
            className="px-4 py-2 bg-lime-400 text-white rounded-lg shadow hover:bg-green-600 transition-colors"
          >
            비밀번호 변경
          </button>
          <button
            onClick={() => navi('/mypage/withdrawal/check')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
          >
            회원탈퇴
          </button>
        </div>
      </div>

      {/* 사용자 정보 카드 */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">이름</p>
                <p className="text-xl font-semibold text-gray-800">
                  {userInfo.name}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
            </div>
            <div className="flex flex-col space-y-6 mb-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">아이디</p>
                  <p className="text-base text-gray-700">
                    {userInfo.username}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">가입일</p>
                  <p className="text-base text-gray-700">
                    {userInfo.joinDate}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">등급</p>
                  <p className="text-base text-gray-700">
                    {userInfo.membership}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">적립포인트</p>
                  <p className="text-base text-gray-700">{userInfo.point}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 대시보드 카드(예시) */}
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="h-85 bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center"
            >
              <div className="flex space-x-4 mb-4">
                <div className="w-16 h-16 bg-pink-200 rounded-full" />
                <div className="w-16 h-16 bg-blue-200 rounded" />
              </div>
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
