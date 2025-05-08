import { useContext, useEffect, useState } from 'react';
import { AuthContext }           from '../Context/AuthContext';
import { useNavigate }           from 'react-router-dom';
import axios                     from 'axios';

export default function EditProfile() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { loginInfo, tokens, isAuthenticated } = auth;

  // 폼 상태
  const [currentPw, setCurrentPw]     = useState('');
  const [phone,      setPhone]        = useState('');
  const [email,      setEmail]        = useState('');
  const [emailCode,  setEmailCode]    = useState('');
  const [isEmailCodeSent,    setIsEmailCodeSent]    = useState(false);
  const [isEmailVerified,    setIsEmailVerified]    = useState(false);
  const [loading,    setLoading]      = useState(true);
  const [error,      setError]        = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
    if (!tokens.accessToken) return;

    setLoading(true);
    axios.get('http://localhost/mypage/editprofile', {
      headers: { Authorization: `Bearer ${tokens.accessToken}` }
    })
    .then(({ data }) => {

      setPhone(data.memberPh || '');

      setEmail(loginInfo.email || data.email || '');
    })
    .catch(err => {
      console.error('프로필 조회 실패', err);
      setError('프로필을 불러오는 데 실패했습니다.');
    })
    .finally(() => {
      setLoading(false);
    });
  }, [
    isAuthenticated,
    tokens.accessToken,
    loginInfo.email,
    navigate
  ]);

  if (loading) return <div className="p-8 text-center">로딩 중...</div>;
  if (error)   return <div className="p-8 text-center text-red-500">{error}</div>;

  // ── 2) 이메일 인증 번호 전송 ──────────────────
  const handleSendEmailCode = async () => {
    try {
      setIsEmailCodeSent(true);
      await axios.post('http://localhost/auth/change-email', 
        { email },
        { headers: { Authorization: `Bearer ${tokens.accessToken}` }}
      );
      alert('이메일로 인증번호가 전송되었습니다.');
    } catch (err) {
      console.error(err);
      alert('인증코드 전송에 실패했습니다.');
      setIsEmailCodeSent(false);
    }
  };

  // ── 3) 이메일 인증 번호 확인 ──────────────────
  const handleVerifyEmailCode = async () => {
    try {
      await axios.post('http://localhost:8080/auth/verify-change-email', 
        { email, code: emailCode },
        { headers: { Authorization: `Bearer ${tokens.accessToken}` }}
      );
      setIsEmailVerified(true);
      alert('이메일 인증이 완료되었습니다.');
    } catch (err) {
      console.error(err);
      alert('인증번호가 올바르지 않습니다.');
    }
  };

  // ── 4) 프로필 수정 제출 ───────────────────────
  const handleSubmit = async e => {
    e.preventDefault();
    if (!currentPw) {
      alert('현재 비밀번호를 입력해주세요.');
      return;
    }
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    try {
      await axios.put('http://localhost:8080/mypage/edit-profile',
        {
          currentPassword: currentPw,
          memberPh: phone,
          email
        },
        { headers: { Authorization: `Bearer ${tokens.accessToken}` }}
      );
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

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* 현재 비밀번호 */}
          <div>
            <label htmlFor="currentPw" className="block mb-1 font-semibold">
              현재 비밀번호
            </label>
            <input
              id="currentPw"
              type="password"
              value={currentPw}
              onChange={e => setCurrentPw(e.target.value)}
              placeholder="현재 비밀번호를 입력하세요"
              className="w-full p-2 border rounded focus:ring-lime-400 focus:outline-none"
            />
          </div>

          {/* 아이디 (읽기 전용) */}
          <div>
            <label htmlFor="userId" className="block mb-1 font-semibold">
              아이디
            </label>
            <input
              id="userId"
              type="text"
              value={loginInfo.username}
              readOnly
              className="w-full p-2 border bg-gray-100 rounded"
            />
          </div>

          {/* 이름 (읽기 전용) */}
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              이름
            </label>
            <input
              id="name"
              type="text"
              value={loginInfo.memberName}
              readOnly
              className="w-full p-2 border bg-gray-100 rounded"
            />
          </div>

          {/* 전화번호 (수정 가능, 인증 없음) */}
          <div>
            <label htmlFor="phone" className="block mb-1 font-semibold">
              전화번호
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full p-2 border rounded focus:ring-lime-400 focus:outline-none"
            />
          </div>

          {/* 이메일 + 인증 */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              이메일
            </label>
            <div className="flex space-x-2">
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 p-2 border rounded focus:ring-lime-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSendEmailCode}
                disabled={isEmailCodeSent}
                className={`px-4 py-2 text-white rounded ${
                  isEmailCodeSent
                    ? 'bg-gray-400'
                    : 'bg-lime-400 hover:bg-lime-500'
                }`}
              >
                {isEmailCodeSent ? '재전송' : '인증번호 전송'}
              </button>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              value={emailCode}
              onChange={e => setEmailCode(e.target.value)}
              placeholder="인증번호"
              disabled={!isEmailCodeSent}
              className="flex-1 p-2 border rounded focus:ring-lime-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleVerifyEmailCode}
              disabled={!isEmailCodeSent || isEmailVerified}
              className={`px-4 py-2 text-white rounded ${
                isEmailVerified
                  ? 'bg-gray-400'
                  : 'bg-lime-400 hover:bg-lime-500'
              }`}
            >
              {isEmailVerified ? '인증완료' : '인증번호 확인'}
            </button>
          </div>

          {/* 제출 / 취소 */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 transition"
            >
              회원정보 수정 완료
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
