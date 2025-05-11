import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { idRegex, pwRegex } from "./Regex";
import logo from '../../assets/EcoInsigthLogo2.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [formData, setFormData] = useState({
    memberId: "",
    memberPw: "",
  });
  const [msg, setMsg] = useState(""); // 에러 메시지, 안내 메시지 등
  const { login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { memberId, memberPw } = formData;

    if (!idRegex.test(memberId)) {
      setMsg("아이디 형식이 올바르지 않습니다.");
      return;
    }
    if (!pwRegex.test(memberPw)) {
      setMsg("비밀번호 형식이 올바르지 않습니다.");
      return;
    }

    axios.post("http://localhost/auth/login", { memberId, memberPw })
      .then(response => {
        if (response.status === 200) {
          if (response.data.loginInfo.isActive === 'N') {
            alert("비활성화된 계정이거나 정지된 계정입니다.");
            return;
          }
          login(response.data.loginInfo, response.data.tokens);
          navigate("/");
        }
      }).catch(error => {
        console.log(error);
        setMsg("아이디 또는 비밀번호가 잘못되었습니다.");
      });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    axios.post("http://localhost/auth/google-login", {
      token: credentialResponse.credential,
    })
    .then((response) => {
      if (response.status === 200) {
        if (response.data.loginInfo.isActive === 'N') {
          alert("비활성화된 계정이거나 정지된 계정입니다.");
        }
        login(response.data.loginInfo, response.data.tokens, true);
        navigate("/");
      }
    })
    .catch((err) => {
      console.error(err);
      setMsg("구글 로그인 실패");
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="logo-area flex items-center space-x-2">
          <img src={logo} alt="EcoInsightLogo" className="h-14 w-auto" />
        </div>
        <button
          onClick={() => navigate(-1)}
          className="inline-block bg-lime-400 transition px-4 py-1 rounded text-lg font-bold mr-8 hover:bg-lime-500"
        >
          <span className="text-white">뒤로가기</span>
        </button>
      </div>

      <div className="flex items-center justify-center bg-gray-100 p-4 min-h-screen">
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow relative">
          <form onSubmit={handleLogin} className="mt-2">
            <div className="mb-6">
              <label htmlFor="memberId" className="block mb-2 text-gray-700 text-sm font-medium">
                아이디
              </label>
              <input
                type="text"
                id="memberId"
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="memberPw" className="block mb-2 text-gray-700 text-sm font-medium">
                비밀번호
              </label>
              <input
                type="password"
                id="memberPw"
                name="memberPw"
                value={formData.memberPw}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>

            {msg && (
              <p className="text-red-500 text-sm mb-4">
                {msg}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex">
                <div onClick={() => navigate("/findId")} className="text-sm text-gray-600 mr-5 cursor-pointer">
                  아이디 찾기
                </div>
                <div onClick={() => navigate("/findPassword")} className="text-sm text-gray-600 cursor-pointer">
                  임시 비밀번호 발급
                </div>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-sub text-white mr-1 pr-3 pl-3 pt-2 pb-2"
                  onClick={() => navigate("/signup")}
                >
                  회원가입
                </button>
                <button
                  type="submit"
                  className="bg-lime-400 text-white px-4 py-2 rounded hover:bg-lime-500 transition-colors font-semibold"
                >
                  로그인
                </button>
              </div>
            </div>
          </form>
          {/* 소셜 로그인 구분선 */}
          <div className="text-center my-4 text-gray-400">또는</div>
          {/* 구글 로그인 버튼 */}
          <div className="flex justify-center mb-10">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setMsg("구글 로그인 실패")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
