import CarbonSavedCard from "./CarbonSavedCard.jsx";
import ParticipantCard from "./ParticipantCard";
import PointCard from "./PointCard";
import CarbonTrendChart from "./CarbonTrendChart.jsx";
import RegionCompareChart from "./RegionCompareChart.jsx";
import RegionRankingChart from "./RagionRankingChart.jsx";

const MainDashBoard = () => {
  return (
    <div className="w-full px-6">
      <div className="max-w-screen-xl mx-auto flex flex-row gap-6">
        <div className="flex-[4] flex flex-col gap-6 border border-dashed border-gray-300 p-4">
          <CarbonSavedCard />
          <ParticipantCard />
          <PointCard />
          <CarbonTrendChart />
          <RegionCompareChart />
        </div>

        <div className="flex-[1] min-w-[220px] max-w-[260px] flex flex-col gap-4 border border-dashed border-gray-300 p-4">
          <RegionRankingChart />
          <div className="border border-gray-300 p-3">
            인증게시판 글? 아니면 실천방법? 아직 모르겠어요 안정했어요
            살려주세요 감사합니다 (예정)
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashBoard;
