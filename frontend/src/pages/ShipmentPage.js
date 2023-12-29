import { FaCalendarDays } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "./Pages.scss";
import Select from "react-select";
import Loader from "../components/Utils/Loader/Loader";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import ShipmentStatusCard from "../components/ParcelTransactionComponents/RecipientShipmentConfirmation/ShipmentStatusCards";
import { handleGettAllRecipientShipment } from "../services/transactionServices";

function ShipmentPage() {
  const [selectedSort, setSelectedSort] = useState({
    label: "Alphabetical",
    value: "Alphabetical",
  });
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [isDisableConfirm, setIsDisableConfirm] = useState(false);
  const [shipments, setShipments] = useState({});
  const parcelStatusOptions = [
    { value: "In transit", label: "In transit" },
    { value: "Delivered successfully", label: "Delivered successfully" },
    { value: "Deliverd unsuccessfully", label: "Deliverd unsuccessfully" },
  ];
  // paginate
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const sortBy = [
    { label: "Alphabetical", value: "Alphabetical" },
    { label: "Date (asc)", value: "Date (asc)" },
    { label: "Date (desc)", value: "Date (desc)" },
  ];

  const itemsPerPage = 6;
  useEffect(() => {
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToSection("shipment-page");
  }, []);

  const fetchData = async () => {
    if (Object.keys(shipments).length > 0) {
      setShipments({});
    }
    const sort = selectedSort.value;
    const status = selectedStatus.map((st) => st.value);
    const result = await handleGettAllRecipientShipment(sort, status);
    if (result.errorCode === 0) {
      setShipments((prev) => result.data);
    }
    setItemOffset(0);
  };

  useEffect(() => {
    // Fetch items from another resources.
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, selectedSort]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(shipments.packages?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(shipments?.packages?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, shipments]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % shipments.packages?.length;
    setItemOffset(newOffset);
  };

  const handleRefresh = async () => {
    await fetchData();
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
    <Container className="shipment-page" id="shipment-page">
      <header className="header">
        <div className="left">
          <h3>{getGreetingMessage()}</h3>
          <p>
            Welcome back, let's begin your shipments in transaction hub here.
          </p>
        </div>
        <div className="right">
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
          <div className="calendar">
            <FaCalendarDays className="icon" />
            <p>{getCurrentDate()}</p>
          </div>
        </div>
      </header>
      <main>
        <div className="filter">
          <div className="left-content">
            <p>Select by parcel status</p>
            <Select
              defaultValue={selectedStatus}
              isMulti
              options={parcelStatusOptions}
              className="multi-select"
              placeholder={"Select/search parcel status(s)"}
              onChange={setSelectedStatus}
            />
          </div>
          <div className="right-content">
            <p>Sort by</p>
            <div className="group-loader">
              {isDisableConfirm && (
                <div className="loading">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              <Select
                defaultValue={selectedSort}
                options={sortBy}
                className="select"
                placeholder={"Sort by...."}
                onChange={setSelectedSort}
              />
            </div>
          </div>
        </div>
        {!Object.keys(shipments).length && <Loader />}
        {Object.keys(shipments).length > 0 && (
          <>
            <ShipmentStatusCard
              shipments={currentItems}
              isDisableConfirm={isDisableConfirm}
              setIsDisableConfirm={setIsDisableConfirm}
              fetchData={fetchData}
            />
            <div className="paginate">
              <p className="info">
                Showing <b>{currentItems?.length}</b> of{" "}
                <b>{shipments?.packages.length}</b> results
              </p>
              <ReactPaginate
                nextLabel={<FaAngleDoubleRight className="icon" />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={pageCount}
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
      </main>
    </Container>
  );
}

export default ShipmentPage;
