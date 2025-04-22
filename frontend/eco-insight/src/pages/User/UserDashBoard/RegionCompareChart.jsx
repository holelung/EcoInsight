import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RegionCompareChart = () => {
  const data = {
    labels: ["서울", "부산", "대전", "광주", "대구"],
    datasets: [
      {
        label: "탄소 절감량 (kg)",
        data: [120, 95, 80, 70, 90],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "kg CO₂",
        },
      },
    },
  };

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">지역별 탄소 절감 비교</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RegionCompareChart;
