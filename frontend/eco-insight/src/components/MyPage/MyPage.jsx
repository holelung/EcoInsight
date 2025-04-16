import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const navigate = useNavigate();

  // 로그인된 유저 정보 (예시)
  const userInfo = {
    name: '홍길동',
  };

  const handleViewEditInfo = () => {
    // 내정보 조회/수정 → EditProfile 페이지
    navigate('/editprofile');
  };

  const handleBoardList = () => {
    // 내가 작성한 게시글 조회 → Myposts 페이지
    navigate('/myposts');
  };

  const handleWithdrawal = () => {
    // 회원탈퇴 → CheckWithdrawal 페이지
    navigate('/withdrawal/check');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 ">
          {userInfo.name}님의 마이페이지
        </h1>
        <div className="flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
          <button
            onClick={handleViewEditInfo}
            className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            내정보 조회/수정
          </button>
          <button
            onClick={handleBoardList}
            className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            내가 작성한 게시글 조회
          </button>
          <button
            onClick={handleWithdrawal}
            className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            회원탈퇴
          </button>
        </div>
      </div>
      {/* 추가 컨텐츠 영역 (카드 예시) */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-medium mb-2">카드 제목 1</h3>
            <p className="text-gray-600">카드 내용 예시...</p>
          </div>
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-medium mb-2">카드 제목 2</h3>
            <p className="text-gray-600">카드 내용 예시...</p>
          </div>
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-medium mb-2">카드 제목 3</h3>
            <p className="text-gray-600">카드 내용 예시...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
