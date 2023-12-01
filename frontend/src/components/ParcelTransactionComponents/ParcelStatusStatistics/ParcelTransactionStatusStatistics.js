import Container from "react-bootstrap/Container";
import "./ParcelTransactionStatusStatistics.scss";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";
function ParcelTransactionStatusStatistics() {
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    Title,
    Filler
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Parcel status statistics",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    tension: 0.3,
  };
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Your contribution",
        borderColor: "rgb(255, 225, 98)",
        backgroundColor: "rgba(255, 225, 98, 0.4)",
        data: labels.map(() => Math.floor(Math.random() * (300 - 50) + 50)),
        // stack: "Stack 2",
        fill: "origin",
      },
      {
        label: "Delivered sucessfully",
        data: labels.map(() => Math.floor(Math.random() * (500 - 100) + 100)),
        backgroundColor: "#91C483",
        stack: "Stack 0",
      },
      {
        label: "Delivered unsuccessfully",
        data: labels.map(() => Math.floor(Math.random() * (100 - 50) + 50)),
        backgroundColor: "#FF6464",
        stack: "Stack 0",
      },
    ],
  };

  return (
    <Container className="parcel-transaction-statistic">
      <Chart type="bar" data={data} options={options} />
    </Container>
  );
}

export default ParcelTransactionStatusStatistics;
