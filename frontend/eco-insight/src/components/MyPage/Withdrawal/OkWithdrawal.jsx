import React from 'react';
import { useNavigate } from 'react-router-dom';

function OkWithdrawal() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // Home 페이지(메인)으로 이동
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="bg-white w-11/12 max-w-3xl shadow-md rounded-md py-16 px-8 md:px-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          회원탈퇴가 완료되었습니다.
        </h2>
        <p className="text-gray-600 mb-8">이용해주셔서 감사합니다.</p>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors"
        >
          Home으로 이동
        </button>
      </div>
    </div>
  );
}

export default OkWithdrawal;
