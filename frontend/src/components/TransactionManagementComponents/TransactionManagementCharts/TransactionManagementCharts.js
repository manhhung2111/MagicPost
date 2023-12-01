import "./TransactionManagementCharts.scss";
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
import { Chart, Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

function TransactionManagementCharts() {
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
        text: "Incoming & Outgoing Parcels",
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
  const parcelsData = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Incoming parcels",
        borderColor: " rgb(19, 195, 107)",
        backgroundColor: " rgba(19, 195, 107, 0.2)",
        data: labels.map(() => Math.floor(Math.random() * (300 - 50) + 50)),
        stack: "Stack 2",
        fill: "origin",
      },
      {
        type: "line",
        label: "Outgoing parcels",
        borderColor: "rgb(47, 128, 208)",
        backgroundColor: "  rgba(47, 128, 208, 0.2)",
        data: labels.map(() => Math.floor(Math.random() * (300 - 50) + 50)),
        stack: "Stack 1",
        fill: "origin",
      },
      {
        label: "Total parcels",
        data: labels.map(() => Math.floor(Math.random() * (100 - 50) + 50)),
        backgroundColor: "rgba(255, 196, 54, 0.7)",
        stack: "Stack 0",
      },
    ],
  };
  const employeeData = {
    labels: ["Hoang Manh Hung", "Hoang Hung Manh", "Phan Anh Duc", "Others"],
    datasets: [
      {
        label: "# of Parcels",
        data: [369, 400, 389, 200],
        backgroundColor: [
          "rgb(19, 195, 107)",
          "rgb(47, 128, 208)",
          "rgba(255, 196, 54, 1)",
          "#EB455F",
        ],
        borderColor: [
          "rgb(19, 195, 107)",
          "rgb(47, 128, 208)",
          "rgba(255, 196, 54, 1)",
          "#EB455F",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="transaction-management-charts">
      <div className="left-content">
        <Chart type="bar" data={parcelsData} options={options} />
      </div>
      <div className="right-content">
        <Doughnut
          data={employeeData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
              title: {
                display: true,
                text: "Employees contribution",
              },
              datalabels: {
                color: "white",
                formatter: (value, context) => {
                  const dataPoints = context.chart.data.datasets[0].data;
                  function totalSum(total, dataPoint) {
                    return total + dataPoint;
                  }
                  const totalValue = dataPoints.reduce(totalSum, 0);
                  const percentage = ((value / totalValue) * 100).toFixed(1);
                  return `${percentage}%`;
                },
                font: {
                  weight: "bold",
                //   size: 16,
                },
              },
            },
            scales: {
              x: {
                // stacked: true,
                beginAtZero: true,
                // display: false,
              },
              y: {
                // stacked: true,
                beginAtZero: true,
                // display: false,
              },
            },
            interaction: {
              //   mode: "index",
              intersect: false,
            },
            tension: 0.3,
          }}
          plugins={[ChartDataLabels]}
        />
      </div>
    </div>
  );
}

export default TransactionManagementCharts;
