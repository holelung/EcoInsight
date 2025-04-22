import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const CarbonTrendChart = () => {
  const data = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    datasets: [
      {
        label: "탄소 절감량 (kg)",
        data: [100, 120, 150, 180, 160, 200],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
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
      <h2 className="text-lg font-semibold mb-2">절감 추이</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default CarbonTrendChart;
