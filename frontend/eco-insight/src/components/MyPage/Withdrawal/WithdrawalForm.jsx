import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WithdrawalForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
   useEffect(() => {
     if (!auth.isAuthenticated) {
       navigate('/login', { replace: true });
     }
   }, [auth.isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('아이디:', userId);
    console.log('비밀번호:', password);
    // 실제 회원 탈퇴 API 호출 후 OkWithdrawal 페이지로 이동
    navigate('/withdrawal/ok');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="bg-white w-11/12 max-w-3xl shadow-md rounded-md p-8 md:p-12 text-center">
        <h2 className="text-2xl font-semibold mb-6">
          회원탈퇴를 위해 아이디와 비밀번호를 입력해주세요
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              className="border border-gray-300 w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="아이디를 입력해주세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
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
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            회원탈퇴하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default WithdrawalForm;
