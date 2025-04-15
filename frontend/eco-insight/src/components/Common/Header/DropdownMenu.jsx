import React from "react";
import { useNavigate } from "react-router-dom";

const SubNavi = () => {
  const navi = useNavigate();
  
  return (
    <div className="absolute top-full left-1/2 w-max border-b-1 pb-2 mb-2 border-gray-200">
      <nav className="flex items-center justify-around px-6 py-2 bg-white">
        <ul className="flex space-x-4 text-gray-600">
          <li
            className="cursor-pointer hover:text-green-600"
            onClick={() => navi("/board/cert")}
          >
            인증게시판
          </li>
          <li
            className="cursor-pointer hover:text-green-600"
            onClick={() => navi("/board/free")}
          >
            자유게시판
          </li>
          <li
            className="cursor-pointer hover:text-green-600"
            onClick={() => navi("/board/qna")}
          >
            질문 게시판
          </li>
          <li
            className="cursor-pointer hover:text-green-600"
            onClick={() => navi("/board/tips")}
          >
            팁
          </li>
        </ul>
      </nav>
    </div>
  );
  
};

export default SubNavi;
