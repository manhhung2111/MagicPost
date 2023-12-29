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
  ArcElement,
  Filler,
} from "chart.js";
import { Chart, Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useState, useEffect } from "react";
import {
  handleGetContribution,
  handleGetOrderStatistics,
} from "../../../services/transactionServices";
function ParcelTransactionStatusStatistics() {
  const [order, setOrders] = useState({ no_of_success: 0, no_of_unsuccess: 0 });
  const [contribution, setContribution] = useState({
    contribution: 0,
    total: 0,
  });
  const fetchOrders = async () => {
    const result = await handleGetOrderStatistics();
    if (result?.errorCode === 0) {
      setOrders((prev) => result.data);
    }
  };
  const fetchContribution = async () => {
    const result = await handleGetContribution();
    if (result?.errorCode === 0) {
      setContribution((prev) => result.data);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchContribution();
  }, []);
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
    ArcElement,
    Filler
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Parcel Status Statistics",
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
    tension: 0.3,
  };
  const labels = ["Delivery successful", "Delivery unsucessful"];
  const parcelsData = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Total orders",
        borderColor: "rgba(255, 196, 54, 0.7)",
        backgroundColor: "rgba(255, 196, 54, 0.7)",
        data: [order.no_of_success, order.no_of_unsuccess],
        fill: "origin",
      },
    ],
  };

  const employeeData = {
    labels: [
      JSON.parse(localStorage.getItem("account"))?.user_info?.name,
      "Others",
    ],
    datasets: [
      {
        label: "# of Parcels",
        data: [contribution.contribution, contribution.total],
        backgroundColor: ["rgb(19, 195, 107)", "rgb(47, 128, 208)"],
        borderColor: ["rgb(19, 195, 107)", "rgb(47, 128, 208)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="parcel-transaction-statistic">
      <div className="doughnut-chart">
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
                text: "Your contribution",
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
      <div className="bar-chart">
        <Chart type="bar" data={parcelsData} options={options} />
      </div>
    </Container>
  );
}

export default ParcelTransactionStatusStatistics;
