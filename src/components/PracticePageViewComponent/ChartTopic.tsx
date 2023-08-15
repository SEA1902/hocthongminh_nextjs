import { useAppSelector } from "@/app/hooks";
import { Topic } from "@/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const ChartTopic = ({ topic }: { topic: Topic }) => {
  const numberCorrect = useAppSelector((state) => state.games.numberCorrect);
  const numberInCorrect = useAppSelector(
    (state) => state.games.numberInCorrect
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Thống kê theo chủ đề",
      },
      toolTip: {
        shared: true,
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          beginAtZero: true,
        },
        title: {
          display: true,
          text: "Số câu",
        },
      },
    },
  };

  const labels = [topic.topicName];

  const data = {
    labels,
    datasets: [
      {
        label: "Đúng",
        barThickness: 30,
        data: labels.map(() => numberCorrect),
        backgroundColor: "#1df083",
      },
      {
        label: "Sai",
        barThickness: 30,
        data: labels.map(() => numberInCorrect),
        backgroundColor: "#f24343",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default ChartTopic;
