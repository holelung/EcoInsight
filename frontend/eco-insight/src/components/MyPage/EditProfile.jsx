import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 임포트

function EditProfile() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
   useEffect(() => {
     if (!auth.isAuthenticated) {
       navigate('/login', { replace: true });
     }
   }, [auth.isAuthenticated, navigate]);

  // 본인 확인용
  const [currentPw, setCurrentPw] = useState('');

  // 전화번호 인증
  const [phone, setPhone] = useState('010-1234-5678');
  const [phoneCode, setPhoneCode] = useState('');
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  // 이메일 인증
  const [email, setEmail] = useState('hong@gmai.com');
  const [emailCode, setEmailCode] = useState('');
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // 핸들러들
  const handleSendPhoneCode = async () => {
    try {
      setIsPhoneCodeSent(true);
      // await axios.post('/api/user/send-phone-code', { phone });
      alert('전화번호로 인증코드가 전송되었습니다.');
    } catch (err) {
      console.error(err);
      alert('인증코드 전송에 실패했습니다.');
      setIsPhoneCodeSent(false);
    }
  };

  const handleVerifyPhoneCode = async () => {
    try {
      // await axios.post('/api/user/verify-phone-code', { phone, code: phoneCode });
      setIsPhoneVerified(true);
      alert('전화번호 인증이 완료되었습니다.');
    } catch (err) {
      console.error(err);
      alert('인증번호가 올바르지 않습니다.');
    }
  };

  const handleSendEmailCode = async () => {
    try {
      setIsEmailCodeSent(true);
      // await axios.post('/api/user/send-email-code', { email });
      alert('이메일로 인증코드가 전송되었습니다.');
    } catch (err) {
      console.error(err);
      alert('인증코드 전송에 실패했습니다.');
      setIsEmailCodeSent(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    try {
      // 실제 API 호출
      // await axios.post('/api/user/verify-email-code', { email, code: emailCode });
      setIsEmailVerified(true);
      alert('이메일 인증이 완료되었습니다.');
    } catch (err) {
      console.error(err);
      alert('인증번호가 올바르지 않습니다.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!currentPw) {
      alert('현재 비밀번호를 입력해주세요.');
      return;
    }
    if (!isPhoneVerified) {
      alert('전화번호 인증을 완료해주세요.');
      return;
    }
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    try {
      // await axios.put('/api/user/update-profile', {
      //   currentPw,
      //   phone,
      //   email
      // });

      alert('회원정보가 수정되었습니다.');
      navigate('/mypage');
    } catch (err) {
      console.error(err);
      alert('회원정보 수정에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow p-8 rounded-2xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          내정보 상세 조회 및 수정
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* 현재 비밀번호 확인 */}
          <div className="mb-6">
            <label htmlFor="currentPw" className="block font-semibold text-gray-700 mb-1">
              현재 비밀번호
            </label>
            <input
              id="currentPw"
              type="password"
              value={currentPw}
              onChange={e => setCurrentPw(e.target.value)}
              placeholder="현재 비밀번호를 입력하세요"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          {/* 아이디 (읽기 전용) */}
          <div className="mb-4">
            <label htmlFor="userId" className="block font-semibold text-gray-700 mb-1">
              아이디
            </label>
            <input
              id="userId"
              type="text"
              defaultValue="hong123"
              readOnly
              className="w-full p-2 border border-gray-200 bg-gray-100 rounded"
            />
          </div>

          {/* 비밀번호 변경 안내 (읽기 전용) */}
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호 변경은 별도 페이지에서 가능합니다"
              readOnly
              className="w-full p-2 border border-gray-200 bg-gray-100 rounded"
            />
          </div>

          {/* 이름 (읽기 전용) */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold text-gray-700 mb-1">
              이름
            </label>
            <input
              id="name"
              type="text"
              defaultValue="홍길동"
              readOnly
              className="w-full p-2 border border-gray-200 bg-gray-100 rounded"
            />
          </div>

          {/* 전화번호 인증 */}
          <div className="mb-4">
            <label htmlFor="phone" className="block font-semibold text-gray-700 mb-1">
              전화번호
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSendPhoneCode}
                className={`px-4 py-2 rounded text-white ${
                  isPhoneCodeSent ? 'bg-gray-400' : 'bg-lime-400 hover:bg-lime-500'
                }`}
              >
                {isPhoneCodeSent ? '재전송' : '인증번호 전송'}
              </button>
            </div>
          </div>
          <div className="mb-6 flex items-center space-x-2">
            <input
              type="text"
              value={phoneCode}
              onChange={e => setPhoneCode(e.target.value)}
              placeholder="인증번호"
              disabled={!isPhoneCodeSent}
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none"
            />
            <button
              type="button"
              onClick={handleVerifyPhoneCode}
              disabled={!isPhoneCodeSent || isPhoneVerified}
              className={`px-4 py-2 rounded text-white ${
                isPhoneVerified
                  ? 'bg-gray-400'
                  : 'bg-lime-400 hover:bg-lime-500'
              }`}
            >
              {isPhoneVerified ? '인증완료' : '인증번호 확인'}
            </button>
          </div>

          {/* 이메일 인증 */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold text-gray-700 mb-1">
              이메일
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSendEmailCode}
                className={`px-4 py-2 rounded text-white ${
                  isEmailCodeSent ? 'bg-gray-400' : 'bg-lime-400 hover:bg-lime-500'
                }`}
              >
                {isEmailCodeSent ? '재전송' : '인증번호 전송'}
              </button>
            </div>
          </div>
          <div className="mb-8 flex items-center space-x-2">
            <input
              type="text"
              value={emailCode}
              onChange={e => setEmailCode(e.target.value)}
              placeholder="인증번호"
              disabled={!isEmailCodeSent}
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none"
            />
            <button
              type="button"
              onClick={handleVerifyEmailCode}
                disabled={!isEmailCodeSent || isEmailVerified}
              className={`px-4 py-2 rounded text-white ${
                isEmailVerified
                  ? 'bg-gray-400'
                  : 'bg-lime-400 hover:bg-lime-500'
              }`}
            >
              {isEmailVerified ? '인증완료' : '인증번호 확인'}
            </button>
          </div>

          {/* 제출 / 취소 */}
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 transition-colors"
            >
              회원정보 수정 완료
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
