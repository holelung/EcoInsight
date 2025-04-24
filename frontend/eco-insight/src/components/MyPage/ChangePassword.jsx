import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios'; // axios 임포트

const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const { auth } = useContext(AuthContext);
   useEffect(() => {
     if (!auth.isAuthenticated) {
       navigate('/login', { replace: true });
     }
   }, [auth.isAuthenticated, navigate]);

  const handleSubmit = async () => {
    if (!newPw || !confirmPw) {
      alert('비밀번호를 모두 입력해주세요.');
      return;
    }
    if (newPw !== confirmPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 실제 API 엔드포인트에 맞춰 URL과 payload 변경
      // await axios.put('/api/user/change-password', {
      //   newPassword: newPw,
      //   confirmPassword: confirmPw,
      // });

      // 변경 성공 시
      alert('비밀번호가 정상적으로 변경되었습니다.');
      navigate('/mypage');
    } catch (error) {
      // 서버에서 전달된 메시지가 있으면 아래처럼 표시
      // alert(error.response?.data?.message || '비밀번호 변경에 실패했습니다.');
      alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* AuthHeader 필요 시 추가 */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-md">
          <div className="space-y-6">
            {/* 새로운 비밀번호 */}
            <div>
              <label className="block mb-1 text-gray-700">새로운 비밀번호</label>
              <input
                type="password"
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
                placeholder="새로 설정할 비밀번호를 입력하세요"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            {/* 새로운 비밀번호 재입력 + 확인 버튼 */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block mb-1 text-gray-700">새로운 비밀번호 재입력</label>
                <input
                  type="password"
                  value={confirmPw}
                  onChange={e => setConfirmPw(e.target.value)}
                  placeholder="새로 설정할 비밀번호를 한 번 더 입력하세요"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="h-12 px-6 mt-7 bg-lime-400 hover:bg-green-500 text-white rounded-lg transition"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
