import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import AdminLogin from "../../pages/Admin/AdminLogin/AdminLogin";

const AdminRoute = ({ children }) => {
  // 1) localStorage에서 꺼내기
  const loginInfoString = localStorage.getItem("loginInfo");

  // 2) null 체크 후 JSON 파싱
  if (loginInfoString) {
    const loginInfo = JSON.parse(loginInfoString);

    // 3) memberRole 검사
    if (loginInfo.memberRole === "ROLE_ADMIN") {
      return children || <Outlet />;
    }
  }

  // 그 외 경우: 로그인 or 권한 없음 처리
  return <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
