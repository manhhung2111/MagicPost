import "./CollectionManagementCharts.scss";
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
import { handleGetEmployeeContribution } from "../../../services/collectionManagementServices";
import { useEffect, useState } from "react";
function CollectionManagementCharts({ order }) {
  const [employeeContribution, setEmployeeContribution] = useState([]);

  const fetchContribution = async () => {
    if (employeeContribution.length > 0) {
      setEmployeeContribution([]);
    }
    const result = await handleGetEmployeeContribution();
    if (result.errorCode === 0) {
      setEmployeeContribution(result.data);
    }
  };
  useEffect(() => {
    fetchContribution();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const labels = ["Incoming parcels", "Outgoing parcels"];

  const parcelsData = {
    labels,
    datasets: [
      {
        label: "Total parcels",
        data: [order?.incomingOrders ?? 0, order?.outgoingOrders ?? 0],
        backgroundColor: "rgba(255, 196, 54, 0.7)",
        stack: "Stack 0",
      },
    ],
  };
  const employeeData = {
    labels: employeeContribution.map((employee) => employee?.name),
    datasets: [
      {
        label: "# of Parcels",
        data: employeeContribution.map((employee) => employee?.parcel),
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

  const handleRefresh = async () => {
    await fetchContribution();
  };
  return (
    <div className="collection-management-charts">
      <div className="left-content">
        <button
          className="refresh-btn"
          type="button"
          onClick={() => handleRefresh()}
        >
          <svg
            viewBox="0 0 16 16"
            className="bi bi-arrow-repeat"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
            <path
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              fill-rule="evenodd"
            ></path>
          </svg>
          Refresh
        </button>
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

export default CollectionManagementCharts;
