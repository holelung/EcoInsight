import { FaLeaf } from "react-icons/fa"; // npm install react-icons 필요

const CarbonSavedCard = () => {
  return (
    <div className="bg-gradient-to-r from-green-100 to-green-200 text-gray-800 rounded-xl shadow-lg p-6 flex items-center justify-between transition hover:scale-[1.02] hover:shadow-xl duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <div className="bg-white p-3 rounded-full shadow-md">
          <FaLeaf className="text-green-600 text-2xl" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-600">
            누적 탄소 절감량
          </div>
          <div className="text-3xl font-bold text-green-700">4,820 kg</div>
        </div>
      </div>

      <div className="text-sm text-green-600 font-semibold">
        ▲ +8.2% <span className="text-gray-500 ml-1">지난달 대비</span>
      </div>
    </div>
  );
};

export default CarbonSavedCard;
