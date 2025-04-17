// src/pages/FindPasswordPage/ResetPassword.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleMain = () => {
    navigate('/'); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
          <p className="text-center text-gray-700 mb-6">
            인증한 이메일로 임시 비밀번호를 보냈습니다.
            로그인 후 마이페이지에서 비밀번호를 변경해 주세요
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleMain}
              className="px-6 py-2 bg-lime-400 hover:bg-green-500 rounded-lg transition"
            >
              홈으로 가기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
