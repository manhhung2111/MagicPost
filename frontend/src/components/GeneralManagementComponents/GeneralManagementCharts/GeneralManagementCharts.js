import "./GeneralManagementCharts.scss";
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
  ArcElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";

function GeneralManagementCharts({ centers }) {
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
    Filler,
    ArcElement
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Incoming & Outgoing Parcels Statistics",
      },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    tension: 0.3,
  };
  const labels = centers?.map((center) => center?.center_code) ?? [];
  const parcelsData = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Incoming parcels",
        borderColor: " rgb(19, 195, 107)",
        backgroundColor: " rgba(19, 195, 107, 0.2)",
        data: centers?.map((center) => center?.totalIncomingOrders),
        stack: "Stack 2",
        fill: "origin",
      },
      {
        type: "line",
        label: "Outgoing parcels",
        borderColor: "rgb(47, 128, 208)",
        backgroundColor: "rgba(47, 128, 208, 0.2)",
        data: centers?.map((center) => center?.totalOutgoingOrders),
        stack: "Stack 1",
        fill: "origin",
      },
      {
        label: "Total parcels",
        data: centers?.map(
          (center) => center?.totalIncomingOrders + center?.totalOutgoingOrders
        ),
        backgroundColor: "rgba(255, 196, 54, 0.7)",
        stack: "Stack 0",
      },
    ],
  };
  return (
    <div className="general-management-charts">
      <Chart
        type="bar"
        data={parcelsData}
        options={options}
        className="chart"
      />
    </div>
  );
}

export default GeneralManagementCharts;
