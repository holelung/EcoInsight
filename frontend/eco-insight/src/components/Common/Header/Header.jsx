import { useNavigate } from "react-router-dom";
import logo from "../../../assets/EcoInsigthLogo2.png";
import ListItem from "../../Button/ListItem";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const navi = useNavigate();
  const [subNav, setSubNav] = useState(false);

  const clickBoardItem = () => {
    navi("/auth-board/cert");
    setSubNav(!subNav);
  };

  const handleMenuClick = (path) => {
    setSubNav(false);
    navi(path);
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
              <ListItem onClick={() => handleMenuClick("/")}>소개</ListItem>
              <ListItem onClick={() => handleMenuClick("/dashboard")}>
                대시보드
              </ListItem>
              <ListItem onClick={() => clickBoardItem()}>게시판</ListItem>
              <ListItem onClick={() => handleMenuClick("/notice")}>
                공지사항
              </ListItem>
              <ListItem onClick={() => handleMenuClick("/frequencyAskPage")}>
                문의하기
              </ListItem>
            </ul>
          </div>
          <div className="button-area flex items-center space-x-4">
            {!auth.isAuthenticated ? (
              <>
                <button
                  className="px-4 py-2 rounded-lg bg-main"
                  onClick={() => navi("/login")}
                >
                  로그인
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-sub text-white"
                  onClick={() => navi("/signup")}
                >
                  회원가입
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 rounded-lg bg-main"
                  onClick={() => navi("/mypage")}
                >
                  마이페이지
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-sub text-white"
                  onClick={logout}
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>

        {/* 하단 Nav */}
        {subNav && (
          <div className="w-full border-b-1 pb-2 mb-2 border-gray-200">
            <nav className="flex items-center justify-around px-6 py-2 bg-white">
              <ul className="flex space-x-4 text-gray-600">
                <li
                  className="cursor-pointer hover:text-green-600"
                  onClick={() => navi("/auth-board/cert")}
                >
                  인증게시판
                </li>
                <li
                  className="cursor-pointer hover:text-green-600"
                  onClick={() => navi("/community/free")}
                >
                  자유게시판
                </li>
                <li
                  className="cursor-pointer hover:text-green-600"
                  onClick={() => navi("/community/qna")}
                >
                  질문 게시판
                </li>
                <li
                  className="cursor-pointer hover:text-green-600"
                  onClick={() => navi("/community/tips")}
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
};

export default Header;
