import logo from "../../../assets/EcoInsigthLogo2.png";
import { useState, useContext } from "react";
import { AuthContext } from "../../../components/Context/AuthContext";
import { idRegex, pwRegex } from "../../../components/Auth/Regex";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    memberId: "",
    memberPw: ""
  });
  const { login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  };

  const handleLogin = (e) =>{
    e.preventDefault();
    const { memberId, memberPw } = formData;
    // 정규식으로 아이디, 비밀번호 간단 검증 (선택 사항)
    if (!idRegex.test(memberId)) {
      alert("아이디를 확인해주십시오.");
      return;
    }
    if (!pwRegex.test(memberPw)) {
      alert("비밀번호 확인해주십시오.");
      return;
    }
    axios.post("http://localhost/auth/admin-login", {memberId, memberPw})
    .then(
      response => {
        if(response.status === 200){
          if(response.data.loginInfo.isActive === 'N' || response.data.loginInfo.memberRole !== 'ROLE_ADMIN'){
            alert("권환이 없습니다.");
            logout();
          }
          navigate("/admin");
        }
      }
    )
    .catch(error =>{
      console.log(error);
      alert("계정 정보를 잘못 입력하였거나 권한이 없습니다.");
      navigate("/admin/login");
    })
  }

  return (
    <>
      <div className="flex h-screen items-center">
        <div className="m-auto w-[50vw] flex flex-col justify-center">
          <div id="title" className="flex flex-row justify-center items-end">
            <img src={logo} alt="EcoInsightLogo" className="h-32 w-auto" />
            <p className="text-4xl pb-3">Admin Login</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="m-auto  flex flex-col items-center w-[500px] border p-3 text-lg rounded-2xl mt-3">
              
              <label className="self-start mx-22 mt-3">아이디</label>
              <input
                type="text"
                id="memberId"
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
                className="border w-[300px] mb-2 py-2 px-2 rounded-xl"
              />
              <label className="self-start mx-22">비밀번호</label>
              <input
                type="password"
                id="memberPw"
                name="memberPw"
                value={formData.memberPw}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className="border w-[300px] mb-3 py-2 px-2 rounded-xl"
              />
              <button
                  type="submit"
                  className="bg-lime-400 text-white px-4 py-2 rounded hover:bg-lime-500 transition-colors font-semibold"
                >
                  로그인
                </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
