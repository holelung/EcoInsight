// src/pages/FindIdResultPage/FindIdResultPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


{/* 예: FindIdPage.jsx 의 handleNext 함수
navigate('/find-id/idresult', {
  state: {
    foundId: '사용자123',      // 실제 API 결과로 대체
    joinDate: '2023.05.17',    // YYYY.MM.DD 형식
  }
});

이거는 state 넘길때 사용하세요
 */}



const FindIdResultPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { foundId = '-', joinDate = '-' } = state || {};

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    

      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold mb-4">아이디 찾기 결과</h2>
        <p className="text-sm text-gray-600 mb-6">
          고객님의 정보와 일치하는 아이디 목록입니다.
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <span className="text-lg font-medium">아이디아이디</span>
            <span className="text-sm text-gray-500">2025-04-17</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-6 py-2 bg-green-400 text-white rounded hover:bg-green-500 transition"
          >
            로그인하기
          </button>
          <button
            onClick={() => navigate('/findPassword')}
            className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            비밀번호 찾기
          </button>
        </div>
      </main>

     
    </div>
  );
};

export default FindIdResultPage;
