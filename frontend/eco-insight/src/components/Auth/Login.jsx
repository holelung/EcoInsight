import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { idRegex, pwRegex } from "./Regex";
import logo from '../../assets/EcoInsigthLogo2.png'
const Login = () => {
  const [formData, setFormData] = useState({
    memberId: "",
    memberPw: "",
  });
  const [msg, setMsg] = useState(""); // 에러 메시지, 안내 메시지 등
  const { login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    const { memberId, memberPw } = formData;

    // 정규식으로 아이디, 비밀번호 간단 검증 (선택 사항)
    if (!idRegex.test(memberId)) {
      setMsg("아이디 형식이 올바르지 않습니다.");
      return;
    }
    if (!pwRegex.test(memberPw)) {
      setMsg("비밀번호 형식이 올바르지 않습니다.");
      return;
    }

    axios.post("http://localhost/auth/login", {memberId, memberPw}).
        then(response => {
            if(response.status === 200){
              if(response.data.loginInfo.isActive === 'N'){
                alert("비활성화된 계정이거나 정지된 계정입니다.");
              }
              login(response.data.loginInfo, response.data.tokens);
              navigate("/");
            }
        }).catch(error =>{
            console.log(error);
            setMsg("아이디 또는 비밀번호가 잘못되었습니다.");
        })
  };

  return (
    <>

    <div className="flex items-center justify-between">
        <div className="logo-area flex items-center space-x-2">
            <img src={logo} alt="EcoInsightLogo" className="h-14 w-auto" />
        </div>
        <button 
        onClick={()=>navigate(-1)}
        className="inline-block bg-lime-400 transition px-4 py-1 rounded text-lg font-bold mr-8 hover:bg-lime-500">
            <span className="text-white">
                뒤로가기
            </span>
        </button>
    </div>
    <div className="flex items-center justify-center bg-gray-100 p-4 min-h-screen">

      {/* 로그인 영역 전체 컨테이너 */}
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow relative ">
        {/* 상단 "로그인" 라벨 */}
        <form onSubmit={handleLogin} className="mt-2">
          {/* 아이디 입력 */}
          <div className="mb-6">
            <label
              htmlFor="memberId"
              className="block mb-2 text-gray-700 text-sm font-medium"
            >
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

          {/* 비밀번호 입력 */}
          <div className="mb-6">
            <label
              htmlFor="memberPw"
              className="block mb-2 text-gray-700 text-sm font-medium"
            >
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

          {/* 에러 혹은 안내 메시지 */}
          {msg && (
            <p className="text-red-500 text-sm mb-4">
              {msg}
            </p>
          )}

          {/* 하단 버튼 및 링크 */}
          <div className="flex items-center justify-between">
            <div className="flex ">
                <div 
                onClick={() => navigate("/findId")}
                className="text-sm text-gray-600 mr-5">
                아이디 찾기 
                </div>
                <div 
                onClick={() => navigate("/findPassword")}
                className="text-sm text-gray-600">
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
      </div>
    </div>
    </>
  );
};

export default Login;
