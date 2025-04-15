import logo from '../../../assets/EcoInsigthLogo2.png'

const Header = () => {

  return (
    <>
      <header className="w-full">
        <div className="flex items-center justify-around px-6 py-5 mb-3 bg-white shadow">
          <div className="logo-area flex items-center space-x-2">
            <img
              src={logo}
              alt="EcoInsightLogo"
              className="h-14 w-auto"
            />
          </div>
          <div className="nav-area">
            <ul className="flex space-x-4 py-3">
              <li>소개합니다</li>
              <li>대시보드</li>
              <li>게시판</li>
              <li>공지사항</li>
              <li>문의하기</li>
            </ul>
          </div>
          <div className="button-area flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg bg-main">로그인</button>
            <button className="px-4 py-2 rounded-lg bg-sub text-white">
              회원가입
            </button>
          </div>
        </div>
      </header>
    </>
  );

}


export default Header;