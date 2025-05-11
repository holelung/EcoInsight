import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  
  if (auth.isAuthenticated && auth.loginInfo.memberRole === "ROLE_ADMIN") {
    return children;
  } else {
    return <Navigate to="/admin/login" replace />
  }

};

export default AdminRoute;
