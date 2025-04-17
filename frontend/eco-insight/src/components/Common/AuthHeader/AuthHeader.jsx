
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../assets/EcoInsigthLogo2.png';

const AuthHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isFindId       = pathname === '/findId';
  const isFindPassword = pathname === '/findPassword';

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
      {/* 로고 */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="EcoInsight Logo"
          className="h-14 w-auto"
        />
      </div>

      {/* 뒤로가기 + 탭 버튼들 */}
      <div className="flex items-center space-x-4">
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-1 bg-lime-400 rounded text-white font-bold hover:bg-lime-500 transition"
        >
          뒤로가기
        </button>

        {/* 아이디 찾기 */}
        <button
          onClick={() => navigate('/findId')}
          className={`px-4 py-1 rounded transition ${
            isFindId
              ? 'bg-lime-400 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          아이디 찾기
        </button>

        {/* 비밀번호 찾기 */}
        <button
          onClick={() => navigate('/findPassword')}
          className={`px-4 py-1 rounded transition ${
            isFindPassword
              ? 'bg-lime-400 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          비밀번호 찾기
        </button>
      </div>
    </header>
  );
};

export default AuthHeader;
