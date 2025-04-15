import React from "react";

const Header = () => {
  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* 상단 헤더 */}
      <header className="bg-white text-black flex items-center justify-between px-6 py-4">
        {/* 로고 */}
        <div className="text-green-500 font-bold text-xl">🌍 Eco Insight</div>

        {/* 네비게이션 메뉴 */}
        <nav className="flex space-x-6">
          <a href="#" className="hover:text-green-600">
            소개합니다
          </a>
          <a href="#" className="hover:text-green-600">
            대시보드
          </a>
          <a href="#" className="hover:text-green-600">
            게시판
          </a>
          <a href="#" className="hover:text-green-600">
            공지사항
          </a>
          <a href="#" className="hover:text-green-600">
            문의하기
          </a>
        </nav>

        {/* 로그인 / 회원가입 */}
        <div className="space-x-2">
          <button className="bg-lime-300 text-black px-4 py-2 rounded">
            로그인
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded">
            회원가입
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
