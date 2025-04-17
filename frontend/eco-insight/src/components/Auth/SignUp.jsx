// src/components/Member/SignUp/SignUp.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  idRegex,
  pwRegex,
  nameRegex,
  emailRegex,
  // phoneRegex, ssnRegex no longer needed
} from "./Regex";
import logo from '../../assets/EcoInsigthLogo2.png';

const SignUp = () => {
  const [formData, setFormData] = useState({
    memberId: "",
    memberPw: "",
    memberPwConfirm: "",
    memberName: "",
    email: "",
    memberPh: "",
    memberSsnFront: "",
    memberSsnBack: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 전화번호 자동 하이픈
    if (name === "memberPh") {
      const digits = value.replace(/\D/g, "");
      let formatted = digits;
      if (digits.length > 3 && digits.length <= 7) {
        formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
      } else if (digits.length > 7) {
        formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
      }
      setFormData(prev => ({ ...prev, memberPh: formatted }));
      return;
    }

    // 주민등록번호 앞, 뒤 분리
    if (name === "memberSsnFront") {
      const digits = value.replace(/\D/g, "").slice(0, 6);
      setFormData(prev => ({ ...prev, memberSsnFront: digits }));
      return;
    }
    if (name === "memberSsnBack") {
      const digits = value.replace(/\D/g, "").slice(0, 7);
      setFormData(prev => ({ ...prev, memberSsnBack: digits }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const {
      memberId,
      memberPw,
      memberPwConfirm,
      memberName,
      email,
      memberPh,
      memberSsnFront,
      memberSsnBack,
    } = formData;

    if (!idRegex.test(memberId)) {
      setMsg("아이디 형식이 올바르지 않습니다."); return;
    }
    if (!pwRegex.test(memberPw)) {
      setMsg("비밀번호 형식이 올바르지 않습니다."); return;
    }
    if (memberPw !== memberPwConfirm) {
      setMsg("비밀번호가 일치하지 않습니다."); return;
    }
    if (!nameRegex.test(memberName)) {
      setMsg("이름은 2~20자, 한글/영문만 가능합니다."); return;
    }
    if (!emailRegex.test(email)) {
      setMsg("올바른 이메일 형식을 입력해주세요."); return;
    }
    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(memberPh)) {
      setMsg("전화번호 형식이 올바르지 않습니다."); return;
    }
    if (memberSsnFront.length < 6 || memberSsnBack.length < 7) {
      setMsg("주민등록번호를 정확히 입력해주세요."); return;
    }

    const memberSsn = `${memberSsnFront}-${memberSsnBack}`;

    axios.post("http://localhost/auth/signup", {
      memberId,
      memberPw,
      memberName,
      email,
      memberPh,
      memberSsn,
    })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        setMsg("회원가입 중 오류가 발생했습니다.");
      }
    })
    .catch(error => {
      console.error(error);
      setMsg(error.response?.data?.message || "회원가입에 실패했습니다.");
    });
  };

  return (
    <>
      {/* 상단 로고 + 뒤로가기 */}
      <div className="flex items-center justify-between mb-4">
        <div className="logo-area flex items-center space-x-2">
          <img src={logo} alt="EcoInsightLogo" className="h-14 w-auto" />
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-block bg-lime-400 transition px-4 py-1 rounded text-lg font-bold hover:bg-lime-500"
        >
          <span className="text-white">뒤로가기</span>
        </button>
      </div>

      {/* 회원가입 폼 */}
      <div className="flex items-center justify-center bg-gray-100 p-4 min-h-screen">
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
          <form onSubmit={handleSignUp}>
            {/* 아이디 */}
            <div className="mb-4">
              <label htmlFor="memberId" className="block mb-1 text-sm font-medium text-gray-700">
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
            {/* 비밀번호 */}
            <div className="mb-4">
              <label htmlFor="memberPw" className="block mb-1 text-sm font-medium text-gray-700">
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
            {/* 비밀번호 확인 */}
            <div className="mb-4">
              <label htmlFor="memberPwConfirm" className="block mb-1 text-sm font-medium text-gray-700">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="memberPwConfirm"
                name="memberPwConfirm"
                value={formData.memberPwConfirm}
                onChange={handleChange}
                placeholder="비밀번호를 한 번 더 입력하세요"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
            {/* 이름 */}
            <div className="mb-4">
              <label htmlFor="memberName" className="block mb-1 text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                type="text"
                id="memberName"
                name="memberName"
                value={formData.memberName}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
            {/* 이메일 */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@domain.com"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
            {/* 전화번호 */}
            <div className="mb-4">
              <label htmlFor="memberPh" className="block mb-1 text-sm font-medium text-gray-700">
                전화번호
              </label>
              <input
                type="text"
                id="memberPh"
                name="memberPh"
                value={formData.memberPh}
                onChange={handleChange}
                placeholder="010-1234-5678"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
            {/* 주민등록번호 */}
            <div className="mb-4 flex space-x-2">
              <div className="w-2/5">
                <label htmlFor="memberSsnFront" className="block mb-1 text-sm font-medium text-gray-700">
                  주민등록번호 앞
                </label>
                <input
                  type="text"
                  id="memberSsnFront"
                  name="memberSsnFront"
                  value={formData.memberSsnFront}
                  onChange={handleChange}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>
              <div className="w-3/5">
                <label htmlFor="memberSsnBack" className="block mb-1 text-sm font-medium text-gray-700">
                  주민등록번호 뒤
                </label>
                <input
                  type="password"
                  id="memberSsnBack"
                  name="memberSsnBack"
                  value={formData.memberSsnBack}
                  onChange={handleChange}
                  placeholder="●●●●●●●"
                  maxLength={7}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>
            </div>

            {/* 에러 메시지 */}
            {msg && <p className="text-red-500 text-sm mb-4">{msg}</p>}

            {/* 제출 버튼 */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-lime-400 text-white px-6 py-2 rounded hover:bg-lime-500 transition-colors font-semibold"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
