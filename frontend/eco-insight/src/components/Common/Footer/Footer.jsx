import React from "react";
import logo from "../../../assets/EcoInsigthLogo2.png"; // 경로에 맞게 수정하세요
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navi = useNavigate();

  return (
    <footer className="w-[80%] m-auto  bg-gray-100 rounded-t-3xl mt-10 px-8 py-6 text-sm text-gray-700">
      {/* 상단 로고 + 메뉴 */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* 로고 */}
        <div className="mb-4 md:mb-0">
          <img src={logo} alt="Eco Insight Logo" className="h-10 w-auto" />
        </div>

        {/* 메뉴 */}
        <ul className="flex space-x-6 font-medium">
          <li
            className="cursor-pointer hover:underline"
            onClick={() => navi("/")}
          >
            소개
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => navi("/dashboard")}
          >
            대시보드
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => navi("/board")}
          >
            게시판
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => navi("/notice")}
          >
            공지사항
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => navi("/contact")}
          >
            문의하기
          </li>
        </ul>
      </div>

      {/* 구분선 */}
      <hr className="my-4 border-gray-300" />

      {/* 하단 카피라이트 + 개인정보 처리방침 */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>© 2025 Positivus. All Rights Reserved.</p>
        <a href="/privacy" className="mt-2 md:mt-0 hover:underline">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
