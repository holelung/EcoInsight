import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const UserRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation(); 
  if (!auth.isAuthenticated) {
    alert('로그인을 먼저 해주세요!');
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default UserRoute;
