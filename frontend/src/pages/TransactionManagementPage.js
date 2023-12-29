import Container from "react-bootstrap/esm/Container";
import { FaCalendarDays } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import "./Pages.scss";
import AddEmployeeAccountModal from "../components/TransactionManagementComponents/AddEmployeeAccountModal/AddEmployeeAccountModal";
import { useState, useEffect } from "react";
import TransactionManagementStatisticsCards from "../components/TransactionManagementComponents/TransactionManagementStatisticsCards/TransactionManagementStatisticsCards";
import TransactionManagementCharts from "../components/TransactionManagementComponents/TransactionManagementCharts/TransactionManagementCharts";
import TransactionManagementParcelTable from "../components/TransactionManagementComponents/TransactionManagementParcelTable/TransactionManagementParcelTable";
import { FaList } from "react-icons/fa6";
import _ from "lodash";
import TransactionEmployeeAccountTable from "../components/TransactionManagementComponents/TransactionEmployeeAccountTable/TransactionEmployeeAccountTable";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Loader from "../components/Utils/Loader/Loader";
import {
  handleGetIncomingParcels,
  handleGetOutgoingParcels,
} from "../services/transactionManagementServices";
function TransactionManagementPage() {
  const [showEmployeeAccountModal, setShowEmployeeAccountModal] =
    useState(false);
  const [isShowSortIncoming, setIsShowSortIncoming] = useState(false);
  const [isShowSortOutgoing, setIsShowSortOutgoing] = useState(false);
  const [cardsStatistics, setCardsStatistics] = useState({
    totalEmployees: 0,
    totalIncomingParcels: 0,
    totalOutgoingParcels: 0,
  });
  const [incomingParcels, setIncomingParcels] = useState({});
  // paginate
  const [incomingCurrentItems, setIncomingCurrentItems] = useState([]);
  const [incomingPageCount, setIncomingPageCount] = useState(0);
  const [incomingItemOffset, setIncomingItemOffset] = useState(0);

  const [outgoingParcels, setOutgoingParcels] = useState({});
  // paginate
  const [outgoingCurrentItems, setOutgoingCurrentItems] = useState([]);
  const [outgoingPageCount, setOutgoingPageCount] = useState(0);
  const [outgoingItemOffset, setOutgoingItemOffset] = useState(0);
  const [sortIncoming, setSortIncoming] = useState([
    { value: "Status", isSelected: true },
    { value: "Id", isSelected: false },
  ]);
  const [sortOutgoing, setSortOutgoing] = useState([
    { value: "Date", isSelected: true },
    { value: "Dest", isSelected: false },
  ]);

  const fetchIncomingParcels = async () => {
    if (Object.keys(incomingParcels).length > 0) {
      setIncomingParcels({});
    }
    const sortBy = sortIncoming.filter((sort) => sort.isSelected)[0].value;
    const result = await handleGetIncomingParcels(sortBy);
    if (result.errorCode === 0) {
      setIncomingParcels((prev) => result.data);
    }
    setIncomingItemOffset(0);
  };

  const fetchOutgoingParcels = async () => {
    if (Object.keys(outgoingParcels).length > 0) {
      setOutgoingParcels({});
    }
    const sortBy = sortOutgoing.filter((sort) => sort.isSelected)[0].value;
    const result = await handleGetOutgoingParcels(sortBy);
    if (result.errorCode === 0) {
      setOutgoingParcels((prev) => result.data);
    }
    setOutgoingItemOffset(0);
  };

  useEffect(() => {
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToSection("transaction-management-page");
  }, []);

  useEffect(() => {
    fetchIncomingParcels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortIncoming]);

  useEffect(() => {
    fetchOutgoingParcels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOutgoing]);

  useEffect(() => {
    if (
      Object.keys(incomingParcels).length > 0 &&
      Object.keys(outgoingParcels).length > 0
    ) {
      setCardsStatistics((prev) => ({
        ...prev,
        totalIncomingParcels: incomingParcels.totalOrders,
        totalOutgoingParcels: outgoingParcels.totalOrders,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingParcels, outgoingParcels]);
  useEffect(() => {
    const endOffset = incomingItemOffset + 4;
    setIncomingCurrentItems(
      incomingParcels.packages?.slice(incomingItemOffset, endOffset)
    );
    setIncomingPageCount(Math.ceil(incomingParcels.packages?.length / 4));
  }, [incomingItemOffset, incomingParcels]);

  useEffect(() => {
    const endOffset = outgoingItemOffset + 4;
    setOutgoingCurrentItems(
      outgoingParcels.packages?.slice(outgoingItemOffset, endOffset)
    );
    setOutgoingPageCount(Math.ceil(outgoingParcels.packages?.length / 4));
  }, [outgoingItemOffset, outgoingParcels]);

  // Invoke when user click to request another page.
  const handleIncomingPageClick = (event) => {
    const newOffset = (event.selected * 4) % incomingParcels.packages?.length;
    setIncomingItemOffset(newOffset);
  };

  const handleOutgoingPageClick = (event) => {
    const newOffset = (event.selected * 4) % outgoingParcels.packages?.length;
    setOutgoingItemOffset(newOffset);
  };

  const handleRefresh = async (isIncoming) => {
    if (isIncoming) {
      await fetchIncomingParcels();
    } else {
      await fetchOutgoingParcels();
    }
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

  const getGreetingMessage = () => {
    const today = new Date();
    const userName =
      JSON.parse(localStorage.getItem("account"))?.user_info?.name ??
      "Manh Hung";
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
      className="transaction-management-page"
      id="transaction-management-page"
    >
      <header className="header">
        <div className="left-content">
          <h3>{getGreetingMessage()}</h3>
          <p>Here's what's happening with your transaction hub today.</p>
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
      <TransactionManagementStatisticsCards cardsStatistics={cardsStatistics} />
      <TransactionEmployeeAccountTable
        itemsPerPage={4}
        setCardsStatistics={setCardsStatistics}
      />
      <TransactionManagementCharts
        order={{
          incomingOrders: incomingParcels?.totalOrders,
          outgoingOrders: outgoingParcels?.totalOrders,
        }}
      />
      <div className="transaction-management-tables" id="tables">
        <div className="left-content">
          <div className="top">
            <h3>Incoming parcels</h3>
            <div>
              <button
                className="refresh-btn"
                type="button"
                onClick={() => handleRefresh(true)}
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
          </div>
          {!Object.keys(incomingParcels).length && <Loader />}
          {Object.keys(incomingParcels).length > 0 && (
            <>
              <TransactionManagementParcelTable
                isIncoming={true}
                orders={incomingCurrentItems}
              />
              <div className="paginate">
                <p className="info">
                  Showing <b>{incomingCurrentItems?.length}</b> of{" "}
                  <b>{incomingParcels?.totalOrders}</b> results
                </p>
                <ReactPaginate
                  nextLabel={<FaAngleDoubleRight className="icon" />}
                  onPageChange={handleIncomingPageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  pageCount={incomingPageCount}
                  previousLabel={<FaAngleDoubleLeft className="icon" />}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                  className="react-paginate"
                />
              </div>
            </>
          )}
        </div>
        <div className="right-content">
          <div className="top">
            <h3>Outgoing parcels</h3>
            <div>
              <button
                className="refresh-btn"
                type="button"
                onClick={() => handleRefresh(false)}
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
          </div>
          {!Object.keys(outgoingParcels).length && <Loader />}
          {Object.keys(outgoingParcels).length > 0 && (
            <>
              <TransactionManagementParcelTable
                isIncoming={false}
                orders={outgoingCurrentItems}
              />
              <div className="paginate">
                <p className="info">
                  Showing <b>{outgoingCurrentItems?.length}</b> of{" "}
                  <b>{outgoingParcels?.totalOrders}</b> results
                </p>
                <ReactPaginate
                  nextLabel={<FaAngleDoubleRight className="icon" />}
                  onPageChange={handleOutgoingPageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  pageCount={outgoingPageCount}
                  previousLabel={<FaAngleDoubleLeft className="icon" />}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                  className="react-paginate"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <AddEmployeeAccountModal
        show={showEmployeeAccountModal}
        setShow={setShowEmployeeAccountModal}
      />
    </Container>
  );
}

export default TransactionManagementPage;
