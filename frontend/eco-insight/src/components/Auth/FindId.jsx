import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from "../Common/AuthHeader/AuthHeader"

const FindIdPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const handleSendCode = () => {
    //  이메일로 인증번호 요청 API 호출
    setIsCodeSent(true);
    alert('인증번호가 발송되었습니다.');
  };

  const handleVerifyCode = () => {
    // 인증번호 확인 API 호출
    setIsCodeVerified(true);
    alert('인증이 완료되었습니다.');
  };

  const handleNext = () => {
    if (!isCodeVerified) {
      alert('먼저 인증을 완료해주세요.');
      return;
    }
    // 아이디 조회 결과 페이지로 이동
    navigate('/find-id/result-id');
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
                  <label className="block mb-1 text-gray-700">이메일 주소</label>
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
                  className={`h-12 px-4 rounded-lg text-white ${
                    isCodeSent ? 'bg-gray-400' : 'bg-lime-400 hover:bg-green-500'
                  }`}
                >
                  {isCodeSent ? '다시받기' : '인증번호 받기'}
                </button>
              </div>

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
                  className={`h-12 px-4 rounded-lg text-white ${
                    isCodeVerified ? 'bg-gray-400' : 'bg-lime-400 hover:bg-green-500'
                  }`}
                >
                  인증번호 확인
                </button>
              </div>

              {/* 다음 버튼 */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleNext}
                  className="mt-4 w-32 h-12 bg-lime-400 hover:bg-green-500 text-white rounded-lg"
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindIdPage;
