import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RegionRankingCard = () => {
  const data = [
    { region: "서울", value: 200 },
    { region: "부산", value: 160 },
    { region: "대구", value: 130 },
    { region: "광주", value: 90 },
    { region: "대전", value: 70 },
  ]; // 추후 axios로 대체

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white border border-gray-300 p-3 rounded-xl shadow w-full">
      <h2 className="text-md font-semibold mb-3">지역별 탄소 절감 랭킹</h2>
      <div className="flex flex-col gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-14 text-sm text-gray-700">{item.region}</div>
            <div className="flex-1 bg-gray-100 h-4 rounded">
              <div
                className="bg-blue-400 h-4 rounded"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm w-10 text-right">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionRankingCard;
