import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // return auth.isAuthenticated && auth.role === "ROLE_ADMIN" ? (
  //   children
  // ) : (
  //   <Navigate to="/admin/login" replace />
  // );
  return children;
};

export default AdminRoute;
