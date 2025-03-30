"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "Platform Growth Overview" },
  },
};

const labels = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

export const data = {
  labels,
  datasets: [
    {
      label: "Users",
      data: [100, 200, 300, 450, 600, 750],
      borderColor: "#4F46E5",
      backgroundColor: "#6366F1",
    },
    {
      label: "Businesses",
      data: [10, 25, 50, 70, 90, 120],
      borderColor: "#16A34A",
      backgroundColor: "#4ADE80",
    },
    {
      label: "Reviews",
      data: [5, 20, 60, 100, 180, 250],
      borderColor: "#F59E0B",
      backgroundColor: "#FBBF24",
    },
    {
      label: "Complaints",
      data: [1, 5, 10, 20, 30, 40],
      borderColor: "#DC2626",
      backgroundColor: "#F87171",
    },
  ],
};

export default function GrowthChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Line options={options} data={data} />
    </div>
  );
}
