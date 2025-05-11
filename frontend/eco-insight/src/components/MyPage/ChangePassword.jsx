import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

export default function ChangePassword() {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const [userId,    setUserId]    = useState('');
  const [newPw,     setNewPw]     = useState('');
  const [confirmPw, setConfirmPw] = useState('');


  useEffect(() => {
    if (!auth.isAuthenticated) {
      navi('/login', { replace: true });
    }
  }, [auth.isAuthenticated, navi]);

  const handleSubmit = async () => {

    if (!userId || !newPw || !confirmPw) {
      alert('모든 입력창에 입력해주세요!');
      return;
    }
    if (newPw !== confirmPw) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axios.put(
        'http://localhost/mypage/changepassword',
        {
          memberId:        userId,
          newPassword:     newPw,
          confirmPassword: confirmPw
        },
        {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('비밀번호가 정상적으로 변경되었습니다.');
      navi('/mypage', { replace: true });
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      const msg = error.response?.data?.message || '비밀번호 변경에 실패했습니다.';
      alert(msg);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-md">
          <div className="space-y-6">
            {/* 아이디 */}
            <div>
              <label className="block mb-1 text-gray-700">아이디</label>
              <input
                type="text"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                placeholder="아이디를 입력하세요"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            {/* 새로운 비밀번호 */}
            <div>
              <label className="block mb-1 text-gray-700">새로운 비밀번호</label>
              <input
                type="password"
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
                placeholder="새 비밀번호를 입력하세요"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            {/* 비밀번호 확인 */}
            <div>
              <label className="block mb-1 text-gray-700">새로운 비밀번호 재입력</label>
              <input
                type="password"
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            {/* 제출 버튼 */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-2 mt-4 bg-lime-400 hover:bg-green-500 text-white rounded-lg transition"
            >
              확인
            </button>
            {/* 취소 버튼 */}
            <button
              type="button"
              onClick={() => navi(-1)}
              className="w-full py-2 mt-2 border rounded-lg hover:bg-gray-100 transition"
            >
              취소
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
