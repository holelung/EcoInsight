import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/Common/AuthHeader/AuthHeader';
import axios from "axios"

const FindPasswordPage = () => {
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [msg, setMsg] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSendCode = () => {
    // 이메일로 인증번호 요청 API 호출
    axios.post("http://localhost/auth/find-password", {
      id : memberId,
      email : email
    }).then(response => {
      if(response.status === 201){
        setIsCodeSent(true);
        alert('인증번호가 발송되었습니다.');
        setMsg("인증번호 발송에 성공하였습니다.");
      }
    }).catch(error => {
      console.log(error);
      setMsg("인증번호 발송에 실패하였습니다.");
    })
  };

  const handleVerifyCode = () => {
    // 인증번호 확인 API 호출
    axios.post("http://localhost/auth/verifycode-password",{
      id : memberId,
      email : email,
      verifyCode : code
    }).then(response => {
      if(response.status === 200){
        alert('인증이 완료되었습니다.');
        navigate('/findpassword/resetpassword');
      }
    }).catch(error => {
      console.log(error);
      alert('인증에 실패하였습니다.');
      setMsg("인증번호 인증에 실패하였습니다.");
    })
    setIsCodeVerified(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 공통 헤더 */}
      <AuthHeader />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold mb-8">임시 비밀번호 발급</h2>

        <div className="flex flex-col md:flex-row bg-white p-8 rounded-2xl shadow-md">
          {/* 폼 영역 */}
          <div className="flex-1 space-y-6">
            {/* 아이디 입력 */}
            <div>
              <label className="block mb-1 text-gray-700">아이디</label>
              <input
                type="text"
                value={memberId}
                onChange={e => setMemberId(e.target.value)}
                placeholder="아이디를 입력하세요"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            {/* 이메일 + 인증번호 받기 */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block mb-1 text-gray-700">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleSendCode}
                className={`h-12 px-4 mt-7 rounded-lg text-white ${
                  isCodeSent ? 'bg-gray-400' : 'bg-lime-400 hover:bg-green-500'
                }`}
              >
                {isCodeSent ? '다시받기' : '인증번호 받기'}
              </button>
            </div>
            {msg && <p className="text-red-500 text-sm mb-4">{msg}</p>}
            {/* 인증번호 입력 + 확인 */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block mb-1 text-gray-700">인증번호 입력</label>
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="인증번호 6자리 숫자 입력"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleVerifyCode}
                className={`h-12 px-4 rounded-lg mt-7 text-white ${
                  isCodeVerified ? 'bg-gray-400' : 'bg-lime-400 hover:bg-green-500'
                }`}
              >
                인증번호 확인
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindPasswordPage;
