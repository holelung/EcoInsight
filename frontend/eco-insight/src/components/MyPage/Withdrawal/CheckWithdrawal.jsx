import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CheckWithdrawal() {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navi('/login', { replace: true });
    }
  }, [auth.isAuthenticated, navi]);

  const handleNext = () => navi('/mypage/withdrawal/form');
  const handleCancel = () => navi('/mypage');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="bg-white w-11/12 max-w-3xl shadow-md rounded-md py-16 px-8 md:px-16 text-center">
        <h2 className="text-2xl font-semibold mb-8">정말로 탈퇴하시겠습니까?</h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
