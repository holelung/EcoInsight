import { useState, useEffect, createContext, Children } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navi = useNavigate();
  const [auth, setAuth] = useState({
    memberInfo: {},
    authTokens: {},
    isAuthenticated: false,
  });

  useEffect(() => {
    const memberInfo = JSON.parse(localStorage.getItem("memberInfo"));
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));

    if (memberInfo && authTokens) {
      setAuth({
        memberInfo,
        authTokens,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (memberInfo, authTokens) => {
    setAuth({
      memberInfo,
      authTokens,
      isAuthenticated: true,
    });
    localStorage.setItem("memberInfo", JSON.stringify(memberInfo));
    localStorage.setItem("authTokens", JSON.stringify(authTokens));
  };

  const logout = (memberInfo, authTokens) => {
    setAuth({
      memberInfo: {},
      authTokens: {},
      isAuthenticated: false,
    });
    localStorage.removeItem("memberInfo");
    localStorage.removeItem("authTokens");
    navi("/");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
