import React from 'react';

function EditProfile() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* 중앙 정렬 & 야무지게 배경/패딩을 준 컨테이너 */}
      <div className="max-w-3xl mx-auto bg-white shadow p-8 rounded">
        {/* 상단 제목 */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          내정보 상세 조회
        </h1>

        {/* 수직 배치를 위한 컨테이너 */}
        <div className="flex flex-col">
          
          {/* 아이디 */}
          <div className="flex items-center">
            <label htmlFor="userId" className="font-semibold text-gray-700">
              아이디
            </label>
          </div>
          <div>
            <input
              id="userId"
              type="text"
              className="mb-4 border border-gray-300 rounded w-full p-2"
              defaultValue="hong123"
              readOnly
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex items-center">
            <label htmlFor="password" className="font-semibold text-gray-700">
              비밀번호
            </label>
          </div>
          <div>
            <input
              id="password"
              type="password"
              className="mb-4 border border-gray-300 rounded w-full p-2"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex items-center">
            <label htmlFor="passwordConfirm" className="font-semibold text-gray-700">
              비밀번호 확인
            </label>
          </div>
          <div>
            <input
              id="passwordConfirm"
              type="password"
              className="mb-4 border border-gray-300 rounded w-full p-2"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>

          {/* 이름 */}
          <div className="flex items-center">
            <label htmlFor="name" className="font-semibold text-gray-700">
              이름
            </label>
          </div>
          <div>
            <input
              id="name"
              type="text"
              className="mb-4 border border-gray-300 rounded w-full p-2"
              defaultValue="홍길동"
            />
          </div>

          {/* 주민등록번호 */}
          <div className="flex items-center">
            <label htmlFor="ssn" className="font-semibold text-gray-700">
              주민등록번호
            </label>
          </div>
          <div>
            <input
              id="ssn"
              type="text"
              className="mb-4 border border-gray-300 rounded w-full p-2"
              placeholder="000000-0000000"
              defaultValue="921010-1******"
            />
          </div>

          {/* 전화번호 변경 */}
          <div className="flex items-center">
            <label htmlFor="phone" className="mb-2 font-semibold text-gray-700">
              전화번호
            </label>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <input
              id="phone"
              type="text"
              className="border border-gray-300 rounded p-2"
              placeholder="010-1234-5678"
              defaultValue="010-1234-5678"
            />
            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-colors rounded">
              인증번호 전송
            </button>
          </div>

          {/* 인증번호 변경 */}
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded p-2"
              placeholder="인증번호"
            />
            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-colors rounded">
              인증번호 확인
            </button>
          </div>

          {/* email 변경 */}
          <div className="flex items-center">
            <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
              이메일
            </label>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <input
              id="email"
              type="text"
              className="border border-gray-300 rounded p-2"
              placeholder="이메일을 입력해주세요"
              defaultValue="hong@gmai.com"
            />
            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-colors rounded">
              인증번호 전송
            </button>
          </div>

          {/* 인증번호 변경 */}
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded p-2"
              placeholder="인증번호"
            />
            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-colors rounded">
              인증번호 확인
            </button>
          </div>
        </div>

        {/* 수정 완료 / 취소 버튼 */}
        <div className="flex justify-center space-x-4 mt-8">
          <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
            회원정보 수정 완료
          </button>
          <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors">
            회원정보 수정 취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
