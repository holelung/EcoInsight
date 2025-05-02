import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  return auth.isAuthenticated && auth.loginInfo.memberRole === "ROLE_ADMIN" ? (
    children
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default AdminRoute;
