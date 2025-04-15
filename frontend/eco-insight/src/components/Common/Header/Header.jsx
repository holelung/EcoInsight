import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/EcoInsigthLogo2.png'
import ListItem from '../../Button/ListItem';
import { useState } from 'react';

const Header = () => {
  const navi = useNavigate();
  const [subNav, setSubNav] = useState(false);

  const clickBoardItem = () => {
    
    setSubNav(!subNav);
  };


  return (
    <>
      <header className="w-full">
        <div className="flex items-center justify-around px-6 py-5 mb-3 bg-white shadow">
          <div className="logo-area flex items-center space-x-2">
            <img src={logo} alt="EcoInsightLogo" className="h-14 w-auto" />
          </div>
          <div className="nav-area">
            <ul className="flex space-x-4 py-3">
              <ListItem onClick={() => navi("/")}>소개</ListItem>
              <ListItem onClick={() => navi("/")}>대시보드</ListItem>
              <ListItem onClick={() => clickBoardItem()}>게시판</ListItem>
              <ListItem onClick={() => navi("/")}>공지사항</ListItem>
              <ListItem onClick={() => navi("/")}>문의하기</ListItem>
            </ul>
          </div>
          <div className="button-area flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg bg-main">로그인</button>
            <button className="px-4 py-2 rounded-lg bg-sub text-white">
              회원가입
            </button>
          </div>
        </div>

        {subNav && (
          <div className="w-full border-b-1 pb-2 mb-2 border-gray-200">
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
        )}
      </header>
    </>
  );

}


export default Header;