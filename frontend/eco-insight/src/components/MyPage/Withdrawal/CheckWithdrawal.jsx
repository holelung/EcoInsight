import React from 'react';
// 필요하다면 useNavigate를 사용하여 다음 페이지로 이동할 수 있습니다.
// import { useNavigate } from 'react-router-dom';

function CheckWithdrawal() {
  // const navigate = useNavigate();

  const handleNext = () => {
    // '다음' 버튼을 클릭했을 때 이동할 페이지나 로직을 추가하세요.
    // 예: navigate('/withdrawal/form');
    console.log('다음 버튼 클릭');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      {/* 중앙 컨테이너(카드) */}
      <div className="bg-white w-11/12 max-w-3xl shadow-md rounded-md py-16 px-8 md:px-16 text-center">
        
        {/* 상단 문구 */}
        <h2 className="text-2xl font-semibold mb-8">
          정말로 탈퇴하시겠습니까?
        </h2>

        {/* '다음' 버튼 */}
        <button
          onClick={handleNext}
          className="
            mt-8
            px-8 py-3
            bg-green-500 
            text-white 
            font-medium 
            rounded-md 
            hover:bg-green-600
            transition-colors
          "
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default CheckWithdrawal;
