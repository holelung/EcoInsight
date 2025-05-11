import { useState, useEffect, createContext, Children } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navi = useNavigate();
  const [auth, setAuth] = useState({
    loginInfo: {},
    tokens: {},
    isLoading: true,
    isAuthenticated: false,
    googleLoginState: false
  });

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    if (loginInfo && tokens && auth.googleLoginState){
      setAuth({
        loginInfo,
        tokens,
        isLoading: false,
        isAuthenticated: true,
        googleLoginState: true,
      });
    }
    else if (loginInfo && tokens) {
      setAuth({
        loginInfo,
        tokens,
        isLoading: false,
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
      googleLoginState: googleLogin // auth.googleLoginState -> true 구글로그인인 상태 false -> 일반로그인 상태 
      // 구글로그인 -> edifprofile 시에는 비밀번호 입력대신 이메일 인증으로 대신함
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
      isLoading: true,
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
