import { useState, useEffect, createContext, Children } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navi = useNavigate();
  const [auth, setAuth] = useState({
    loginInfo: {},
    tokens: {},
    isAuthenticated: false,
    googleLoginState: false
  });

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    if (loginInfo && tokens && googleLoginState){
      setAuth({
        loginInfo,
        tokens,
        isAuthenticated: true,
        googleLoginState: true,
      });
    }
    else if (loginInfo && tokens) {
      setAuth({
        loginInfo,
        tokens,
        isAuthenticated: true,
        googleLoginState: false
      });
    }
  }, []);
  const login = (loginInfo, tokens, googleLogin=false) => {
    setAuth({
      loginInfo,
      tokens,
      isAuthenticated: true,
      googleLoginState: googleLogin
    });
    localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
    localStorage.setItem("tokens", JSON.stringify(tokens));
    localStorage.setItem("googleLoginState", JSON.stringify(googleLogin));
    console.log(JSON.stringify(tokens));
    console.log(JSON.stringify(loginInfo));
  };

  const logout = () => {
    setAuth({
      loginInfo: {},
      tokens: {},
      isAuthenticated: false,
      googleLoginState: false,
    });
    localStorage.removeItem("loginInfo");
    localStorage.removeItem("tokens");
    localStorage.removeItem("googleLoginState");
    navi("/");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
