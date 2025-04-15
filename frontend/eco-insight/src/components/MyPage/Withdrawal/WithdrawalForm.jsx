import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function WithdrawalForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 탈퇴 로직 또는 Confirm 페이지로 이동 등을 처리
    // e.g. navigate('/withdrawal/check');
    console.log('아이디:', userId);
    console.log('비밀번호:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      {/* 중앙의 카드(박스) 영역 */}
      <div className="bg-white w-11/12 max-w-3xl shadow-md rounded-md p-8 md:p-12 text-center">
        
        {/* 안내 문구 */}
        <h2 className="text-2xl font-semibold mb-6">
          회원탈퇴를 위해 아이디와 비밀번호를 입력해주세요
        </h2>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 아이디 입력 필드 */}
          <div>
            <input
              type="text"
              className="
                border border-gray-300 w-full px-4 py-2 
                rounded focus:outline-none focus:ring-2 
                focus:ring-green-500
              "
              placeholder="아이디를 입력해주세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 입력 필드 */}
          <div>
            <input
              type="password"
              className="
                border border-gray-300 w-full px-4 py-2 
                rounded focus:outline-none focus:ring-2 
                focus:ring-green-500
              "
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 회원탈퇴하기 버튼 */}
          <button
            type="submit"
            className="
              bg-green-500 
              hover:bg-green-600 
              text-white 
              px-6 py-3 
              rounded-md 
              font-medium
              transition-colors
            "
          >
            회원탈퇴하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default WithdrawalForm;
