import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navi = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 사이드바 */}
      <aside className="w-60 bg-white shadow-md px-4 py-6">
        <h2 className="text-xl font-bold mb-8">관리자 메뉴</h2>
        <ul className="space-y-4 text-gray-700">
          <li
            className="cursor-pointer hover:text-green-600"
            onClick={() => navi("/admin/dashboard")}
          >
            대시보드
          </li>
          <li
            className="cursor-pointer hover:text-green-600"
            onClick={() => navi("/admin/users")}
          >
            사용자 관리
          </li>
          <li
            className="cursor-pointer hover:text-green-600"
            onClick={() => navi("/admin/posts")}
          >
            게시글 관리
          </li>
        </ul>
      </aside>

      {/* 메인 영역 */}
      <div className="flex flex-col flex-grow">
        {/* 상단바 */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Eco Insight 관리자</h1>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            onClick={() => {
              localStorage.clear();
              navi("/");
            }}
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
