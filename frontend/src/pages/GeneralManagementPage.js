import Container from "react-bootstrap/Container";
import "./Pages.scss";
import { useState, useEffect } from "react";
import { FaList } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import AddManagerAccountModal from "../components/GeneralManagementComponents/AddManagerAccountModal/AddManagerAccountModal";
import GeneralManagementStatisticsCards from "../components/GeneralManagementComponents/GeneralManagementStatisticsCards/GeneralManagementStatisticsCards";
import ManagerAccountTabel from "../components/GeneralManagementComponents/ManagerAccountTable/ManagerAccountTabel";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Loader from "../components/Utils/Loader/Loader";
import _ from "lodash";
import {
  handleGetTransactionStatistics,
  handleGetCollectionStatistics,
} from "../services/generalManagementServices";
import GeneralManagementParcelTable from "../components/GeneralManagementComponents/GeneralManagementParcelTable/GeneralManagementParcelTable";
import GeneralManagementCharts from "../components/GeneralManagementComponents/GeneralManagementCharts/GeneralManagementCharts";
function GeneralManagementPage() {
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [isShowSortTransaction, setIsShowSortTransaction] = useState(false);
  const [isShowSortCollection, setIsShowSortCollection] = useState(false);
  const [transactionParcels, setTransactionParcels] = useState({});
  // paginate
  const [transactionCurrentItems, setTransactionCurrentItems] = useState([]);
  const [transactionPageCount, setTransactionPageCount] = useState(0);
  const [transactionItemOffset, setTransactionItemOffset] = useState(0);

  const [collectionParcels, setCollectionParcels] = useState({});
  // paginate
  const [collectionCurrentItems, setCollectionCurrentItems] = useState([]);
  const [collectionPageCount, setCollectionPageCount] = useState(0);
  const [collectionItemOffset, setCollectionItemOffset] = useState(0);
  const [sortTransaction, setSortTransaction] = useState([
    { value: "Postal", isSelected: true },
    { value: "Center", isSelected: false },
  ]);
  const [sortCollection, setSortCollection] = useState([
    { value: "Postal", isSelected: true },
    { value: "Center", isSelected: false },
  ]);
  const [cardsStatistics, setCardsStatistics] = useState({
    totalManagers: 0,
    totalTransactionParcels: 0,
    totalCollectionParcels: 0,
    totalCenters: 0,
  });
  useEffect(() => {
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToSection("general-management-page");
  }, []);

  const fetchTransactionParcels = async () => {
    if (Object.keys(transactionParcels).length > 0) {
      setTransactionParcels({});
    }

    const result = await handleGetTransactionStatistics();
    if (result.errorCode === 0) {
      setTransactionParcels((prev) => result.data);
    }
    setTransactionItemOffset(0);
  };
  const fetchCollectionParcels = async () => {
    if (Object.keys(collectionParcels).length > 0) {
      setCollectionParcels({});
    }
    // const sortBy = sortCollection.filter((sort) => sort.isSelected)[0].value;
    const result = await handleGetCollectionStatistics();
    if (result.errorCode === 0) {
      setCollectionParcels((prev) => result.data);
    }
    setCollectionItemOffset(0);
  };

  useEffect(() => {
    fetchTransactionParcels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortTransaction]);

  useEffect(() => {
    fetchCollectionParcels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortCollection]);

  useEffect(() => {
    if (
      Object.keys(transactionParcels).length > 0 &&
      Object.keys(collectionParcels).length > 0
    ) {
      const sumPropertyValue = (arr, property) => {
        return arr.reduce((accumulator, currentValue) => {
          // Check if the property exists in the current object
          if (currentValue.hasOwnProperty(property)) {
            // Add the property value to the accumulator
            return accumulator + currentValue[property];
          } else {
            // If the property is missing, return the current accumulator
            return accumulator;
          }
        }, 0); // Initialize accumulator with 0
      };
      setCardsStatistics((prev) => ({
        ...prev,
        totalIncomingParcels:
          sumPropertyValue(
            transactionParcels?.packages,
            "totalIncomingOrders"
          ) +
          sumPropertyValue(collectionParcels?.packages, "totalIncomingOrders"),
        totalOutgoingParcels:
          sumPropertyValue(
            transactionParcels?.packages,
            "totalOutgoingOrders"
          ) +
          sumPropertyValue(collectionParcels?.packages, "totalOutgoingOrders"),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionParcels, collectionParcels]);

  useEffect(() => {
    const endOffset = transactionItemOffset + 4;
    setTransactionCurrentItems(
      transactionParcels.packages?.slice(transactionItemOffset, endOffset)
    );
    setTransactionPageCount(Math.ceil(transactionParcels.packages?.length / 4));
  }, [transactionItemOffset, transactionParcels]);

  useEffect(() => {
    const endOffset = collectionItemOffset + 4;
    setCollectionCurrentItems(
      collectionParcels.packages?.slice(collectionItemOffset, endOffset)
    );
    setCollectionPageCount(Math.ceil(collectionParcels.packages?.length / 4));
  }, [collectionItemOffset, collectionParcels]);

  // Invoke when user click to request another page.
  const handleTransactionPageClick = (event) => {
    const newOffset =
      (event.selected * 4) % transactionParcels.packages?.length;
    setTransactionItemOffset(newOffset);
  };

  const handleCollectionPageClick = (event) => {
    const newOffset = (event.selected * 4) % collectionParcels.packages?.length;
    setCollectionItemOffset(newOffset);
  };

  const handleChangeSort = (isTransaction, valueChange) => {
    if (isTransaction) {
      let tmp = _.cloneDeep(sortTransaction);
      tmp = tmp.map((sort) => {
        let isSelected = false;
        if (sort.value === valueChange) isSelected = true;
        return { ...sort, isSelected: isSelected };
      });
      setSortTransaction(tmp);
      setIsShowSortTransaction(false);
    } else {
      let tmp = _.cloneDeep(sortCollection);
      tmp = tmp.map((sort) => {
        let isSelected = false;
        if (sort.value === valueChange) isSelected = true;
        return { ...sort, isSelected: isSelected };
      });
      setSortCollection(tmp);
      setIsShowSortCollection(false);
    }
  };
  const handleRefresh = async (isTransaction) => {
    if (isTransaction) {
      await fetchTransactionParcels();
    } else {
      await fetchCollectionParcels();
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
    <Container className="general-management-page" id="general-management-page">
      <header className="header">
        <div className="left-content">
          <h3>{getGreetingMessage()}</h3>
          <p>Here's what's happening with all your centers today.</p>
        </div>
        <div className="right-content">
          <div className="calendar">
            <FaCalendarDays className="icon" />
            <p>{getCurrentDate()}</p>
          </div>
          <button
            className="button"
            onClick={() => setShowAddAccountModal(true)}
          >
            <IoAddCircleOutline className="icon" />
            Add manager account
          </button>
        </div>
      </header>
      <GeneralManagementStatisticsCards cardsStatistics={cardsStatistics} />
      <ManagerAccountTabel
        itemsPerPage={4}
        setCardsStatistics={setCardsStatistics}
      />
      <GeneralManagementCharts
        centers={transactionParcels?.packages?.concat(
          collectionParcels?.packages
        )}
      />
      <div className="general-management-tables" id="tables">
        <div className="left-content">
          <div className="top">
            <h3>Transaction centers</h3>
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
              <p onClick={() => setIsShowSortTransaction((prev) => !prev)}>
                {sortTransaction.find((sort) => sort.isSelected === true).value}{" "}
                <FaList />
              </p>
              <ul className={`${isShowSortTransaction ? "active" : ""}`}>
                <p>Sort by</p>
                {sortTransaction.map((sort, index) => {
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
          {!Object.keys(transactionParcels).length && <Loader />}
          {Object.keys(transactionParcels).length > 0 && (
            <>
              <GeneralManagementParcelTable orders={transactionCurrentItems} />
              <div className="paginate">
                <p className="info">
                  Showing <b>{transactionCurrentItems?.length}</b> of{" "}
                  <b>{transactionParcels?.totalOrders}</b> results
                </p>
                <ReactPaginate
                  nextLabel={<FaAngleDoubleRight className="icon" />}
                  onPageChange={handleTransactionPageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  pageCount={transactionPageCount}
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
            <h3>Collection centers</h3>
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
              <p onClick={() => setIsShowSortCollection((prev) => !prev)}>
                {sortCollection.find((sort) => sort.isSelected === true).value}{" "}
                <FaList />
              </p>
              <ul className={`${isShowSortCollection ? "active" : ""}`}>
                <p>Sort by</p>
                {sortCollection.map((sort, index) => {
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
          {!Object.keys(collectionParcels).length && <Loader />}
          {Object.keys(collectionParcels).length > 0 && (
            <>
              <GeneralManagementParcelTable orders={collectionCurrentItems} />
              <div className="paginate">
                <p className="info">
                  Showing <b>{collectionCurrentItems?.length}</b> of{" "}
                  <b>{collectionParcels?.totalOrders}</b> results
                </p>
                <ReactPaginate
                  nextLabel={<FaAngleDoubleRight className="icon" />}
                  onPageChange={handleCollectionPageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  pageCount={collectionPageCount}
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
      <AddManagerAccountModal
        show={showAddAccountModal}
        setShow={setShowAddAccountModal}
        setCardsStatistics={setCardsStatistics}
      />
    </Container>
  );
}

export default GeneralManagementPage;
