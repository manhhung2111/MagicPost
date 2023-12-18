import Container from "react-bootstrap/esm/Container";
import { FaCalendarDays } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import "./Pages.scss";
import { useState, useEffect } from "react";
import { FaList } from "react-icons/fa6";
import _ from "lodash";
import AddCollectionEmployeeAccountModal from "../components/CollectionManagementComponents/AddCollectionEmployeeAccountModal/AddCollectionEmployeeAccountModal";
import CollectionEmployeeAccountTable from "../components/CollectionManagementComponents/CollectionEmployeeAccountTable/CollectionEmployeeAccountTabel";
import CollectionManagementCharts from "../components/CollectionManagementComponents/CollectionManagementCharts/CollectionManagementCharts";
import CollectionManagementParcelTable from "../components/CollectionManagementComponents/CollectionManagementParcelTable/CollectionManagementParcelTable";
import CollectionManagementStatisticsCards from "../components/CollectionManagementComponents/CollectionManagementStatisticsCards/CollectionManagementStatisticsCards";
function CollectionManagementPage() {
  const [showEmployeeAccountModal, setShowEmployeeAccountModal] =
    useState(false);
  const [isShowSortIncoming, setIsShowSortIncoming] = useState(false);
  const [isShowSortOutgoing, setIsShowSortOutgoing] = useState(false);

  const [sortIncoming, setSortIncoming] = useState([
    { value: "Date", isSelected: true },
    { value: "Status", isSelected: false },
    { value: "Source", isSelected: false },
  ]);
  const [sortOutgoing, setSortOutgoing] = useState([
    { value: "Date", isSelected: true },
    { value: "Status", isSelected: false },
    { value: "Dest", isSelected: false },
  ]);

  useEffect(() => {
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToSection("collection-management-page");
  }, []);

  const cardsStatistics = {
    totalIncomingParcels: 10324,
    totalOutgoingParcels: 5692,
    totalEmployees: 11,
  };

  const handleChangeSort = (isIncoming, valueChange) => {
    if (isIncoming) {
      let tmp = _.cloneDeep(sortIncoming);
      tmp = tmp.map((sort) => {
        let isSelected = false;
        if (sort.value === valueChange) isSelected = true;
        return { ...sort, isSelected: isSelected };
      });
      setSortIncoming(tmp);
      setIsShowSortIncoming(false);
    } else {
      let tmp = _.cloneDeep(sortOutgoing);
      tmp = tmp.map((sort) => {
        let isSelected = false;
        if (sort.value === valueChange) isSelected = true;
        return { ...sort, isSelected: isSelected };
      });
      setSortOutgoing(tmp);
      setIsShowSortOutgoing(false);
    }
  };

  const incomingParcels = [
    {
      parcelId: "MPN0WBQ9JJoHN",
      from: "Hoai Duc Hub",
      date: "21/11/2023",
      status: "Pending",
    },
    {
      parcelId: "MPN0WBQ9JJoHN",
      from: "Cau Giay Hub",
      date: "21/11/2023",
      status: "Confirmed",
    },
    {
      parcelId: "MPN0WBQ9JJoHN",
      from: "Hoai Duc Hub",
      date: "21/11/2023",
      status: "Confirmed",
    },
    {
      parcelId: "MPN0WBQ9JJoHN",
      from: "Hoai Duc Hub",
      date: "21/11/2023",
      status: "Pending",
    },
    {
      parcelId: "MPN0WBQ9JJoHN",
      from: "Hoai Duc Hub",
      date: "21/11/2023",
      status: "Pending",
    },
  ];
  const outgoingParcels = [
    {
      parcelId: "MPN0WBQ9JJoHN",
      to: "Hoai Duc Hub",
      date: "21/11/2023",
      status: "Pending",
    },
    {
      parcelId: "MPN0WBQ9JJoHN",
      to: "Cau Giay Hub",
      date: "21/11/2023",
      status: "Confirmed",
    },
    {
      parcelId: "MPN0WBQ9JJoHN",
      to: "Hoai Duc Hub",
      date: "21/11/2023",
      status: "Pending",
    },
    {
      parcelId: "MPN0WBQ9JJoHN",
      to: "Hoai Duc Hub",
      date: "21/11/2023",
      status: "Confirmed",
    },
    {
      parcelId: "MPN0WBQ9JJoHN",
      to: "Hoai Duc Hub",
      date: "21/11/2023",
      status: "Pending",
    },
  ];
  const getGreetingMessage = () => {
    const today = new Date();
    const userName =
      JSON.parse(localStorage.getItem("account"))?.user_info?.name ?? "Manh Hung";
    if (today.getHours() >= 0 && today.getHours() < 12)
      return `Good morning, ${userName}!`;
    else if (today.getHours() <= 18) return `Good afternoon, ${userName}!`;
    return `Good evening, ${userName}!`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const arr = today.toDateString().split(" ");
    return `${arr[2]} ${arr[1]}, ${arr[3]}`;
  };
  return (
    <Container
      className="collection-management-page"
      id="collection-management-page"
    >
      <header className="header">
        <div className="left-content">
          <h3>{getGreetingMessage()}</h3>
          <p>Here's what's happening with your collection hub today.</p>
        </div>
        <div className="right-content">
          <div className="calendar">
            <FaCalendarDays className="icon" />
            <p>{getCurrentDate()}</p>
          </div>
          <button
            className="button"
            onClick={() => setShowEmployeeAccountModal(true)}
          >
            <IoAddCircleOutline className="icon" />
            Add employee account
          </button>
        </div>
      </header>
      <CollectionManagementStatisticsCards cardsStatistics={cardsStatistics} />
      <CollectionEmployeeAccountTable />
      <CollectionManagementCharts />
      <div className="collection-management-tables" id="tables">
        <div className="left-content">
          <div className="top">
            <h3>Incoming parcels</h3>
            <p onClick={() => setIsShowSortIncoming((prev) => !prev)}>
              {sortIncoming.find((sort) => sort.isSelected === true).value}{" "}
              <FaList />
            </p>
            <ul className={`${isShowSortIncoming ? "active" : ""}`}>
              <p>Sort by</p>
              {sortIncoming.map((sort, index) => {
                return (
                  <li
                    key={index}
                    className={`${sort.isSelected ? "active" : ""}`}
                    onClick={() => handleChangeSort(true, sort.value)}
                  >
                    {sort.value}
                  </li>
                );
              })}
            </ul>
          </div>
          <CollectionManagementParcelTable
            isIncoming={true}
            orders={incomingParcels}
          />
          <div className="bot">
            <p>
              Showing <b>5</b> of <b>25</b> reults
            </p>
          </div>
        </div>
        <div className="right-content">
          <div className="top">
            <h3>Outgoing parcels</h3>
            <p onClick={() => setIsShowSortOutgoing((prev) => !prev)}>
              {sortOutgoing.find((sort) => sort.isSelected === true).value}{" "}
              <FaList />
            </p>
            <ul className={`${isShowSortOutgoing ? "active" : ""}`}>
              <p>Sort by</p>
              {sortOutgoing.map((sort, index) => {
                return (
                  <li
                    key={index}
                    className={`${sort.isSelected ? "active" : ""}`}
                    onClick={() => handleChangeSort(false, sort.value)}
                  >
                    {sort.value}
                  </li>
                );
              })}
            </ul>
          </div>
          <CollectionManagementParcelTable
            isIncoming={false}
            orders={outgoingParcels}
          />
          <div className="bot">
            <p>
              Showing <b>5</b> of <b>25</b> reults
            </p>
          </div>
        </div>
      </div>
      <AddCollectionEmployeeAccountModal
        show={showEmployeeAccountModal}
        setShow={setShowEmployeeAccountModal}
      />
    </Container>
  );
}

export default CollectionManagementPage;
