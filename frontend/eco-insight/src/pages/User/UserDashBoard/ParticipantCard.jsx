import { FaUsers } from "react-icons/fa";

const ParticipantCard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 rounded-xl shadow-lg p-6 flex items-center justify-between transition hover:scale-[1.02] hover:shadow-xl duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <div className="bg-white p-3 rounded-full shadow-md">
          <FaUsers className="text-blue-600 text-2xl" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-600">
            누적 참여자 수
          </div>
          <div className="text-3xl font-bold text-blue-700">13,242명</div>
        </div>
      </div>

      <div className="text-sm text-blue-600 font-semibold">
        ▲ +3.4% <span className="text-gray-500 ml-1">지난달 대비</span>
      </div>
    </div>
  );
};

export default ParticipantCard;
