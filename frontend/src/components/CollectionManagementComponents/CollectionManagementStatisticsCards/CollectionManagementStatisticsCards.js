import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import Counter from "../../Utils/Counter/Counter";
import {
  GoPackageDependencies,
  GoPackageDependents,
  GoPackage,
} from "react-icons/go";
import { FaUsersLine } from "react-icons/fa6";
import "./CollectionManagementStatisticsCards.scss";

function CollectionManagementStatisticsCards({ cardsStatistics }) {
  const handleScrollToView = () => {
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToSection("tables");
  };

  return (
    <div className="collection-management-statistic-cards">
      <div className="collection-management-statistic-card">
        <div className="left-content">
          <h3>Total Incoming Parcels</h3>
          <Counter end={cardsStatistics.totalIncomingParcels} />
          <p onClick={handleScrollToView}>View incoming parcels</p>
        </div>
        <div className="right-content">
          <p className="increase">
            <FaArrowTrendUp />
            + <Counter end={6.91} decimal={2} />%
          </p>
          <GoPackageDependencies className="icon incoming" />
        </div>
      </div>
      <div className="collection-management-statistic-card">
        <div className="left-content">
          <h3>Total Outgoing Parcels</h3>
          <Counter end={cardsStatistics.totalOutgoingParcels} />
          <p onClick={handleScrollToView}>View outgoing parcels</p>
        </div>
        <div className="right-content">
          <p className="decrease">
            <FaArrowTrendDown />
            <Counter end={-21.11} decimal={2} />%
          </p>
          <GoPackageDependents className="icon outgoing" />
        </div>
      </div>
      <div className="collection-management-statistic-card">
        <div className="left-content">
          <h3>Total Parcels</h3>
          <Counter
            end={
              cardsStatistics.totalOutgoingParcels +
              cardsStatistics.totalIncomingParcels
            }
          />
          <p onClick={handleScrollToView}>See details</p>
        </div>
        <div className="right-content">
          <p className="increase">
            <FaArrowTrendUp />
            +<Counter end={3.96} decimal={2} />%
          </p>
          <GoPackage className="icon total" />
        </div>
      </div>
      <div className="collection-management-statistic-card">
        <div className="left-content">
          <h3>Total Employees</h3>
          <Counter end={cardsStatistics.totalEmployees} />
          <p>See details</p>
        </div>
        <div className="right-content">
          <p className="">
            +<Counter end={0} decimal={2} />%
          </p>
          <FaUsersLine className="icon" />
        </div>
      </div>
    </div>
  );
}

export default CollectionManagementStatisticsCards;
