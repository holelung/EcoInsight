import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  idRegex,
  pwRegex,
  nameRegex,
  emailRegex
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
    verifyCode: "",
  });
  const [emailCode, setEmailCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // 인증번호 타이머
  useEffect(() => {
    let interval;
    if (codeSent && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setCodeSent(false);
    }
    return () => clearInterval(interval);
  }, [codeSent, timer]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "memberPh") {
      const digits = value.replace(/\D/g, "");
      let formatted = digits;
      if (digits.length > 3 && digits.length <= 7) {
        formatted = `${digits.slice(0,3)}-${digits.slice(3)}`;
      } else if (digits.length > 7) {
        formatted = `${digits.slice(0,3)}-${digits.slice(3,7)}-${digits.slice(7,11)}`;
      }
      setFormData(prev => ({ ...prev, memberPh: formatted }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendCode = () => {
    if (!emailRegex.test(formData.email)) {
      setMsg("유효한 이메일을 입력해주세요.");
      return;
    }
    axios.post("http://localhost/auth/send-code", { email: formData.email })
      .then(() => {
        setCodeSent(true);
        setTimer(180); // 3분
        setMsg("인증번호를 발송했습니다.");
      })
      .catch(error => {
        console.log(error);
        setMsg("인증번호 발송 실패")
      });
  };

  const verifyCode = () => {
    axios.post("http://localhost/auth/verify-code", {
      email: formData.email,
      verifyCode: formData.verifyCode
    })
    .then(() => {
      setCodeVerified(true);
      setMsg("이메일 인증이 완료되었습니다!");
    })
    .catch(error => {
      console.log(error);
      setMsg("인증번호가 일치하지 않습니다.")
    });
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
    } = formData;

    if (!idRegex.test(memberId)) { setMsg("아이디 형식이 올바르지 않습니다."); return; }
    if (!pwRegex.test(memberPw)) { setMsg("비밀번호 형식이 올바르지 않습니다."); return; }
    if (memberPw !== memberPwConfirm) { setMsg("비밀번호가 일치하지 않습니다."); return; }
    if (!nameRegex.test(memberName)) { setMsg("이름은 2~20자, 한글/영문만 가능합니다."); return; }
    if (!codeVerified) { setMsg("이메일 인증 후 회원가입 해주세요."); return; }
    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(memberPh)) { setMsg("전화번호 형식이 올바르지 않습니다."); return; }

    axios.post("http://localhost/members", {
      memberId,
      memberPw,
      memberName,
      email,
      memberPh,
    })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        setMsg("회원가입 중 오류가 발생했습니다.");
      }
    })
    .catch(error => setMsg(error.response?.data?.message || "회원가입에 실패했습니다."));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="logo-area flex items-center space-x-2">
          <img src={logo} alt="EcoInsightLogo" className="h-14 w-auto" />
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-block bg-lime-400 px-4 py-1 rounded text-lg font-bold hover:bg-lime-500"
        >뒤로가기</button>
      </div>
      <div className="flex items-center justify-center bg-gray-100 p-4 min-h-screen">
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
          <form onSubmit={handleSignUp}>
            {/* 아이디 */}
            <div className="mb-4">
              <label htmlFor="memberId" className="block mb-1 text-sm text-gray-700">아이디</label>
              <input
                id="memberId"
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-lime-400"
              />
            </div>
            {/* 비밀번호 */}
            <div className="mb-4">
              <label htmlFor="memberPw" className="block mb-1 text-sm text-gray-700">비밀번호</label>
              <input
                type="password"
                id="memberPw"
                name="memberPw"
                value={formData.memberPw}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-lime-400"
              />
            </div>
            {/* 비밀번호 확인 */}
            <div className="mb-4">
              <label htmlFor="memberPwConfirm" className="block mb-1 text-sm text-gray-700">비밀번호 확인</label>
              <input
                type="password"
                id="memberPwConfirm"
                name="memberPwConfirm"
                value={formData.memberPwConfirm}
                onChange={handleChange}
                placeholder="비밀번호를 한 번 더 입력하세요"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-lime-400"
              />
            </div>
            {/* 이름 */}
            <div className="mb-4">
              <label htmlFor="memberName" className="block mb-1 text-sm text-gray-700">이름</label>
              <input
                id="memberName"
                name="memberName"
                value={formData.memberName}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-lime-400"
              />
            </div>
            {/* 이메일 & 인증 */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-sm text-gray-700">이메일</label>
              <div className="flex space-x-2">
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  disabled={codeVerified}
                  className="flex-grow px-4 py-2 border rounded focus:ring-2 focus:ring-lime-400"
                />
                <button
                  type="button"
                  onClick={sendCode}
                  disabled={codeSent || codeVerified}
                  className="px-4 py-2 bg-lime-400 text-white rounded hover:bg-lime-500"
                >{codeVerified ? "인증완료" : "인증번호 발송"}</button>
              </div>
            </div>
            {codeSent && !codeVerified && (
              <div className="mb-4 flex items-center space-x-2">
                <input
                  id="verifyCode"
                  name="verifyCode"
                  value={formData.verifyCode}
                  onChange={handleChange}
                  placeholder="인증번호 입력"
                  className="flex-grow px-4 py-2 border rounded focus:ring-2 focus:ring-lime-400"
                />
                <button
                  type="button"
                  onClick={verifyCode}
                  className="px-4 py-2 bg-lime-400 text-white rounded hover:bg-lime-500"
                >확인</button>
                <span className="text-sm text-gray-600">
                  {Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')}
                </span>
              </div>
            )}
            {/* 전화번호 */}
            <div className="mb-4">
              <label htmlFor="memberPh" className="block mb-1 text-sm text-gray-700">전화번호</label>
              <input
                id="memberPh"
                name="memberPh"
                value={formData.memberPh}
                onChange={handleChange}
                placeholder="010-1234-5678"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-lime-400"
              />
            </div>

            {msg && <p className="text-red-500 text-sm mb-4">{msg}</p>}
            <div className="text-center">
              <button
                type="submit"
                className="bg-lime-400 text-white px-6 py-2 rounded hover:bg-lime-500 font-semibold"
              >회원가입</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
