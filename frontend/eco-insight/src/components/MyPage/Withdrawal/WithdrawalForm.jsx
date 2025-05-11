import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function WithdrawalForm() {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navi('/login', { replace: true });
    }
  }, [auth.isAuthenticated, navi]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      'http://localhost/mypage/withdrawal',
      { currentPassword: password },
      { headers: { Authorization: `Bearer ${auth.tokens.accessToken}` } }
    )
    .then(() => {
      navi('/mypage/withdrawal/ok');
    })
    .catch((err) => {
      console.error('회원탈퇴 실패:', err);
      alert(err.response?.data?.message || '회원탈퇴 중 오류가 발생했습니다.');
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="bg-white w-11/12 max-w-3xl shadow-md rounded-md p-8 md:p-12 text-center">
        <h2 className="text-2xl font-semibold mb-6">회원탈퇴를 위해 비밀번호를 입력해주세요</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              className="border border-gray-300 w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition-colors w-full"
          >
            탈퇴하기
          </button>
        </form>
      </div>
    </div>
  );
}