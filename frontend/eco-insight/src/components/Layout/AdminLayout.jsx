import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/EcoInsigthLogo2.png";
import MenuItem from "../Button/MenuItem";
import { use, useState } from "react";


const AdminLayout = () => {
  const navi = useNavigate();
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);

  const clickLogout = () => {
    localStorage.clear();
    navi("/");
  }

  const clickMenuItem = (link) => {
    navi(link);

  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 사이드바 */}
      <aside className="w-60 bg-white shadow-md px-4 py-3">
        <img src={logo} alt="EcoInsightLogo" className="h-14 w-auto" />
        <h2 className="text-xl font-bold mb-8 mt-5">관리자 메뉴</h2>
        <ul className="space-y-4 text-gray-700">
          <MenuItem onClick={() => navi("/admin/dashboard")}>대시보드</MenuItem>
          <MenuItem
            onClick={() => navi("/admin/point")}
            isActive={location.pathname === "/admin/point"}
          >
            포인트 관리
          </MenuItem>
          <MenuItem
            onClick={() => navi("/admin/user")}
            isActive={location.pathname === "/admin/user"}
          >
            계정 관리
          </MenuItem>
          <MenuItem
            onClick={() => navi("/admin/authBoard")}
            isActive={location.pathname === "/admin/authBoard"}
          >
            인증 게시물
          </MenuItem>
          <MenuItem
            onClick={() => navi("/admin/communityBoard")}
            isActive={location.pathname === "/admin/communityBoard"}
          >
            게시글 관리
          </MenuItem>
          <MenuItem
            onClick={() => navi("/admin/noticeBoard")}
            isActive={location.pathname === "/admin/noticeBoard"}
          >
            공지사항 작성
          </MenuItem>
        </ul>
      </aside>

      {/* 메인 영역 */}
      <div className="flex flex-col flex-grow">
        {/* 상단바 */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Eco Insight 관리자명</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => clickLogout()}
          >
            로그아웃
          </button>
        </header>

        {/* 메인 컨텐츠 영역 */}
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
