import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const navigate = useNavigate();

  // 읽기 전용 필드
  const [userId] = useState('hong123');
  const [name] = useState('홍길동');
  const [rrn] = useState('921010-1******');

  // 수정 가능한 필드들
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('010-1234-5678');
  const [email, setEmail] = useState('hong@example.com');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }
    // 서버에 수정 정보 전송 (예: API 호출)
    console.log('회원정보 수정 요청:', {
      userId,
      password,
      phone,
      email,
    });
    alert('회원정보가 수정되었습니다.');
    // 수정 완료 후 마이페이지로 이동
    navigate('/mypage');
  };

  const handleCancel = () => {
    // 수정 취소 시 마이페이지로 이동
    navigate('/mypage');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="bg-white w-11/12 max-w-4xl shadow-md rounded-md p-8 md:p-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          내정보 상세 조회
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 아이디 (수정 불가) */}
          <div>
            <label htmlFor="userId" className="block mb-1 text-gray-700">
              아이디
            </label>
            <input
              type="text"
              id="userId"
              className="w-full px-3 py-2 border rounded bg-gray-100 focus:outline-none focus:border-blue-400"
              value={userId}
              disabled
            />
          </div>
          {/* 비밀번호 */}
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-400"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* 비밀번호 확인 */}
          <div>
            <label htmlFor="passwordConfirm" className="block mb-1 text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passwordConfirm"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-400"
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
          {/* 이름 (수정 불가) */}
          <div>
            <label htmlFor="name" className="block mb-1 text-gray-700">
              이름
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded bg-gray-100 focus:outline-none focus:border-blue-400"
              value={name}
              disabled
            />
          </div>
          {/* 주민등록번호 (수정 불가) */}
          <div>
            <label htmlFor="rrn" className="block mb-1 text-gray-700">
              주민등록번호
            </label>
            <input
              type="text"
              id="rrn"
              className="w-full px-3 py-2 border rounded bg-gray-100 focus:outline-none focus:border-blue-400"
              value={rrn}
              disabled
            />
          </div>
          {/* 전화번호 */}
          <div>
            <label htmlFor="phone" className="block mb-1 text-gray-700">
              전화번호
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-400"
              placeholder="010-****-****"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          {/* 이메일 */}
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-400"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* 버튼 그룹 */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              회원정보 수정 완료
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            >
              회원정보 수정 취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
