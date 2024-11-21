import React, { useEffect, useState } from "react";
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
import { ChartData } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DemoData {
  name: string;
  owedByUser: number;
  owedToUser: number;
}

const ReactChart: React.FC<{ label1: string; label2: string }> = ({
  label1,
  label2,
}) => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const demoData: DemoData[] = [
      { name: "January", owedByUser: 120, owedToUser: 80 },
      { name: "February", owedByUser: 80, owedToUser: 100 },
      { name: "March", owedByUser: 150, owedToUser: 120 },
      { name: "April", owedByUser: 70, owedToUser: 60 },
      { name: "May", owedByUser: 100, owedToUser: 20 },
      { name: "June", owedByUser: 90, owedToUser: 30 },
      { name: "July", owedByUser: 130, owedToUser: 110 },
    ];

    const labels = demoData.map((item) => item.name);
    const owedByUser = demoData.map((item) => item.owedByUser);
    const owedToUser = demoData.map((item) => item.owedToUser);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Owed by User", // "Owed by User"
          data: owedByUser,
          borderColor: "rgba(255,99,132,1)", // Red line for Owed by User
          backgroundColor: "rgba(255,99,132,0.2)", // Light red background
          tension: 0.4,
        },
        {
          label: "Owed to User", // "Owed to User"
          data: owedToUser,
          borderColor: "rgba(54,162,235,1)", // Blue line for Owed to User
          backgroundColor: "rgba(54,162,235,0.2)", // Light blue background
          tension: 0.4,
        },
      ],
    });
  }, [label1, label2]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(156, 163, 175, 0.3)", // Slate-300 color with 30% opacity
          borderWidth: 0.2, // Make the gridline thin
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(156, 163, 175, 0.3)", // Slate-300 color with 30% opacity
          borderWidth: 0.2, // Make the gridline thin
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-white">
        Analytics of Shared Expenses
      </h2>

      <Line
        className="xl:!h-[50%] xl:!w-[70%]"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default ReactChart;
