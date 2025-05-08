import { useState, useEffect, createContext, Children } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navi = useNavigate();
  const [auth, setAuth] = useState({
    loginInfo: {},
    tokens: {},
    isAuthenticated: false,
  });

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    if (loginInfo && tokens) {
      setAuth({
        loginInfo,
        tokens,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (loginInfo, tokens) => {
    setAuth({
      loginInfo,
      tokens,
      isAuthenticated: true,
    });
    localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
    localStorage.setItem("tokens", JSON.stringify(tokens));
    console.log(JSON.stringify(tokens));
    console.log(JSON.stringify(loginInfo));
  };

  const logout = () => {
    setAuth({
      loginInfo: {},
      tokens: {},
      isAuthenticated: false,
    });
    localStorage.removeItem("loginInfo");
    localStorage.removeItem("tokens");
    navi("/");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
