import { useState, useEffect, createContext, Children } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // session.setAttribute("키", 밸류)
  const [auth, setAuth] = useState({
    memberNo: null,
    memberId: null,
    memberName: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const memberName = localStorage.getItem("memberName");
    const memberId = localStorage.getItem("memberId");
    const memberNo = localStorage.getItem("memberNo");

    if (accessToken && refreshToken && memberName && memberId && memberNo) {
      setAuth({
        memberNo,
        memberId,
        memberName,
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (memberNo, memberId, memberName, accessToken, refreshToken) => {
    setAuth({
      memberNo,
      memberId,
      memberName,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
    localStorage.setItem("memberId", memberId);
    localStorage.setItem("memberName", memberName);
    localStorage.setItem("memberNo", memberNo);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setAuth({
      memberNo: null,
      memberId: null,
      memberName: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("memberId");
    localStorage.removeItem("memberName");
    localStorage.removeItem("memberNo");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
