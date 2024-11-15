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
  value: number;
}

const ReactChart: React.FC<{ label: string }> = ({ label }) => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const demoData: DemoData[] = [
      { name: "January", value: 65 },
      { name: "February", value: 59 },
      { name: "March", value: 80 },
      { name: "April", value: 81 },
      { name: "May", value: 56 },
      { name: "June", value: 55 },
      { name: "July", value: 40 },
    ];

    const labels = demoData.map((item) => item.name);
    const values = demoData.map((item) => item.value);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: label,
          data: values,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
      ],
    });
  }, [label]);

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
        Analytic of the current year
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
