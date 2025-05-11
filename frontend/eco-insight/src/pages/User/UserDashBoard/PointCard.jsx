import { FaCoins } from "react-icons/fa";

const PointCard = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-800 rounded-xl shadow-lg p-6 flex items-center justify-between transition hover:scale-[1.02] hover:shadow-xl duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <div className="bg-white p-3 rounded-full shadow-md">
          <FaCoins className="text-yellow-600 text-2xl" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-600">
            총 포인트 적립량
          </div>
          <div className="text-3xl font-bold text-yellow-700">128,400P</div>
        </div>
      </div>

      <div className="text-sm text-yellow-600 font-semibold">
        ▲ +12.5% <span className="text-gray-500 ml-1">지난달 대비</span>
      </div>
    </div>
  );
};

export default PointCard;
