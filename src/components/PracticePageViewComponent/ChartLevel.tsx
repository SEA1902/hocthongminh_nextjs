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
import { Question } from "@/types";
import { useAppSelector } from "@/app/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartLevel = ({ questions }: { questions: [Question] }) => {
  const results = useAppSelector((state) => state.games.results);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Thống kê theo độ khó",
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

  const labels = ["Nhận biết", "Thông hiểu", "Vận dụng"];

  const data = {
    labels,
    datasets: [
      {
        label: "Đúng",
        barThickness: 30,
        data: labels.map(
          (label, index) =>
            questions.filter(
              (question: Question, indexQuestion) =>
                results[indexQuestion] != null &&
                question.answer == results[indexQuestion] &&
                question.level == index + 1
            ).length
        ),
        backgroundColor: "#1df083",
      },
      {
        label: "Sai",
        barThickness: 30,
        data: labels.map(
          (label, index) =>
            questions.filter(
              (question: Question, indexQuestion) =>
                results[indexQuestion] != null &&
                question.answer != results[indexQuestion] &&
                question.level == index + 1
            ).length
        ),
        backgroundColor: "#f24343",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default ChartLevel;
