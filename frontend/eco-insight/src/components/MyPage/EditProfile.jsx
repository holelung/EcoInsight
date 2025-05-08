// src/frontend/src/components/EditProfile.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext }           from '../Context/AuthContext';
import { useNavigate }           from 'react-router-dom';
import axios                     from 'axios';

export default function EditProfile() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { tokens, isAuthenticated } = auth;

  const [form, setForm] = useState({
    currentPassword: '',
    memberName:      '',
    memberPh:        '',
    email:           ''
  });
  const [initialEmail,   setInitialEmail]    = useState('');
  const [emailCode,      setEmailCode]       = useState('');
  const [isEmailSent,    setIsEmailSent]     = useState(false);
  const [isEmailVerified,setIsEmailVerified] = useState(false);
  const [loading,        setLoading]         = useState(true);
  const [error,          setError]           = useState(null);

  // 1) 기존 정보 불러오기
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
    axios
      .get('http://localhost/mypage/editprofile', {
        headers: { Authorization: `Bearer ${tokens.accessToken}` }
      })
      .then(({ data }) => {
        setForm({
          currentPassword: '',
          memberName:      data.memberName,
          memberPh:        data.memberPh,
          email:           data.email
        });
        setInitialEmail(data.email);
      })
      .catch(err => {
        console.error('프로필 조회 실패:', err);
        setError('프로필을 불러오는 데 실패했습니다.');
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated, tokens.accessToken, navigate]);

  if (loading) return <div className="p-8 text-center">로딩 중...</div>;
  if (error)   return <div className="p-8 text-center text-red-500">{error}</div>;

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2) 이메일 인증번호 전송 (이메일이 바뀔 때만)
  const sendEmailCode = () => {
    if (form.email === initialEmail) return;
    setIsEmailSent(true);
    axios
      .post(
        'http://localhost/auth/change-email',
        { email: form.email },
        { headers: { Authorization: `Bearer ${tokens.accessToken}` } }
      )
      .then(() => alert('이메일 인증코드가 전송되었습니다.'))
      .catch(() => {
        alert('이메일 인증코드 전송에 실패했습니다.');
        setIsEmailSent(false);
      });
  };

  // 3) 이메일 인증번호 확인
  const verifyEmailCode = () => {
    axios
      .post(
        'http://localhost/auth/verify-code',
        { email: form.email, verifyCode: emailCode },
        { headers: { Authorization: `Bearer ${tokens.accessToken}` } }
      )
      .then(() => {
        setIsEmailVerified(true);
        alert('이메일 인증이 완료되었습니다.');
      })
      .catch(() => alert('인증번호가 올바르지 않습니다.'));
  };

  // 4) 최종 제출
  const handleSubmit = () => {
    if (!form.currentPassword) {
      alert('현재 비밀번호를 입력해주세요.');
      return;
    }
    // 이메일을 바꿀 때만 이메일 인증을 반드시 완료해야 함
    if (form.email !== initialEmail && !isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    axios
      .put(
        'http://localhost/mypage/editprofile',
        form,
        { headers: { Authorization: `Bearer ${tokens.accessToken}` } }
      )
      .then(() => {
        alert('프로필이 성공적으로 수정되었습니다.');
        navigate('/mypage');
      })
      .catch(err => {
        console.error('프로필 수정 실패:', err);
        alert('프로필 수정에 실패했습니다.');
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">내 정보 수정</h1>
        <div className="space-y-4">
          {/* 현재 비밀번호 */}
          <div>
            <label className="block mb-1">현재 비밀번호</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={onChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* 이름 */}
          <div>
            <label className="block mb-1">이름</label>
            <input
              type="text"
              name="memberName"
              value={form.memberName}
              onChange={onChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* 전화번호 */}
          <div>
            <label className="block mb-1">전화번호</label>
            <input
              type="text"
              name="memberPh"
              value={form.memberPh}
              onChange={onChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* 이메일 */}
          <div>
            <label className="block mb-1">이메일</label>
            <div className="flex space-x-2">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                className="flex-1 p-2 border rounded"
              />
              {form.email !== initialEmail && (
                <button
                  onClick={sendEmailCode}
                  disabled={isEmailSent}
                  className={`px-4 rounded text-white ${
                    isEmailSent ? 'bg-gray-400' : 'bg-lime-400'
                  }`}
                >
                  {isEmailSent ? '재전송' : '인증번호 전송'}
                </button>
              )}
            </div>
          </div>
          {form.email !== initialEmail && isEmailSent && (
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="인증번호"
                value={emailCode}
                onChange={e => setEmailCode(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={verifyEmailCode}
                disabled={isEmailVerified}
                className={`px-4 rounded text-white ${
                  isEmailVerified ? 'bg-gray-400' : 'bg-lime-400'
                }`}
              >
                {isEmailVerified ? '인증완료' : '인증확인'}
              </button>
            </div>
          )}
          {/* 제출/취소 */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-lime-500 text-white rounded"
            >
              수정 완료
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 border rounded"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
