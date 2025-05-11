import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // 1. 아직 로딩 중이면 화면을 잠깐 멈춤
  if (auth.isLoading) {
    return <div>로딩 중...</div>;
  }

  // 2. 인증된 관리자면 children을 렌더
  if (auth.isAuthenticated && auth.loginInfo.memberRole === "ROLE_ADMIN") {
    return children ? children : <Outlet />;
  }

  // 3. 인증 실패 시 로그인 페이지로 리다이렉트
  return <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
