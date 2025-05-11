import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from "../Common/AuthHeader/AuthHeader"
import axios from "axios"
const FindIdPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [memberId, setMemberId] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [msg, setMsg] = useState('');
  const handleSendCode = () => {
    //  이메일로 인증번호 요청 API 호출
    axios.post("http://localhost/auth/find-id", {
      memberName : name, 
      email : email
    })
         .then(response => {
            if(response.status === 201){
              setIsCodeSent(true);
              alert('인증번호가 발송되었습니다.');
              setMsg("인증번호 발송에 성공하였습니다.");
            }
         })
         .catch(error => {
            console.log(error);
            setMsg("인증번호 발송에 실패하였습니다.");
         })
  };

  const handleVerifyCode = () => {
    // 인증번호 확인 API 호출
    axios.post("http://localhost/auth/verify-code", {
      email : email,
      verifyCode : code})
      .then(response => {
        if(response.status === 200){
          setMemberId(response.data);
          setIsCodeVerified(true);
          alert('인증이 완료되었습니다.');
        }
      }).catch(error => {
        console.log(error);
        alert('인증에 실패하였습니다.');
        setMsg("인증번호 인증에 실패하였습니다.")
      })
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 공통 헤더 */}
      <AuthHeader />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold mb-8">아이디 찾기</h2>

        <div className="flex flex-col md:flex-row bg-white p-8 rounded-2xl shadow-md">
          {/* 왼쪽 폼 */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* 이름 */}
              <div>
                <label className="block mb-1 text-gray-700">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="이름 입력하세요"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>

              {/* 이메일 */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block mb-1 text-gray-700">이메일</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="이메일 입력하세요"
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
              {/* 인증번호 */}
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
        </div>
        {memberId && (
          <div className="flex flex-col bg-white p-8 rounded-2xl shadow-md mt-4 max-w-md mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-md mt-6 max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                🔍 찾으신 아이디
              </h3>
              <p className="text-3xl font-bold text-lime-600 break-words">
                {memberId}
              </p>
            </div>
            <div className="mt-6 flex flex-row justify-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-6 py-2 bg-lime-400 text-white rounded hover:bg-green-500 transition"
              >
                로그인하기
              </button>
              <button
                onClick={() => navigate('/findPassword')}
                className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                비밀번호 찾기
              </button>
            </div>
          </div>
      )}
        
      </main>
    </div>
  );
};

export default FindIdPage;
