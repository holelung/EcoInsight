// src/pages/FindPasswordPage/ResetPassword.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleReset = () => {
    navigate('/changepassword'); // ChangePassword.jsx가 매핑된 경로로 변경하세요
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
          <p className="text-center text-gray-700 mb-6">
            로그인을 위하여 비밀번호 재설정이 필요합니다.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg transition"
            >
              비밀번호 재설정하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
