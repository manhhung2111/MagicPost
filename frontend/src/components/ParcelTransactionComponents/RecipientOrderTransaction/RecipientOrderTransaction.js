import Container from "react-bootstrap/Container";
import "./RecipientOrderTransaction.scss";
import DelvieryOrderRecipientTable from "./DelvieryOrderRecipientTable";
import Select from "react-select";
import { handleGetAllOrdersToShip } from "../../../services/transactionServices";
import Loader from "../../Utils/Loader/Loader";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useEffect, useState } from "react";

function RecipientOrderTransaction({ itemsPerPage }) {
  const [orders, setOrders] = useState({});
  const [selectedParcelType, setSelectedParcelType] = useState([]);

  const [selectedSort, setSelectedSort] = useState({
    label: "Alphabetical",
    value: "Alphabetical",
  });
  // paginate
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [isDisableConfirm, setIsDisableConfirm] = useState(false);

  const fetchData = async () => {
    if (Object.keys(orders).length > 0) {
      setOrders({});
    }
    const sort = selectedSort.value;
    let parcelType = "";
    if (selectedParcelType.length === 1) {
      parcelType = selectedParcelType[0].value;
    } else if (selectedParcelType.length === 2) {
      parcelType = "Both";
    } else {
      parcelType = "";
    }
    const result = await handleGetAllOrdersToShip(sort, parcelType);
    if (result.errorCode === 0) {
      setOrders((prev) => result.data);
    }
    setItemOffset(0);
  };

  useEffect(() => {
    // Fetch items from another resources.
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedParcelType, selectedSort]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(orders.packages?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(orders?.packages?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, orders]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.packages?.length;
    setItemOffset(newOffset);
  };

  const handleRefresh = async () => {
    await fetchData();
  };

  const parcelTypeOptions = [
    { value: "Document", label: "Document" },
    { value: "Package", label: "Package" },
  ];

  const sortBy = [
    { label: "Alphabetical", value: "Alphabetical" },
    { label: "Date (asc)", value: "Date (asc)" },
    { label: "Date (desc)", value: "Date (desc)" },
  ];

  return (
    <Container className="recipient-order-transaction-delivery">
      <div className="header">
        <h2>Create recipient's delivery order</h2>
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
      </div>
      <div className="pending-confirmation-orders">
        <div className="filter">
          <div className="left-content">
            <p>Select by parcel type</p>
            <Select
              defaultValue={selectedParcelType}
              isMulti
              options={parcelTypeOptions}
              className="multi-select"
              placeholder={"Select/search parcel type(s)"}
              onChange={setSelectedParcelType}
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
        {!Object.keys(orders).length && <Loader />}
        {Object.keys(orders).length > 0 && (
          <>
            <DelvieryOrderRecipientTable
              orders={currentItems}
              isDisableConfirm={isDisableConfirm}
              setIsDisableConfirm={setIsDisableConfirm}
              fetchData={fetchData}
            />
            <div className="paginate">
              <p className="info">
                Showing <b>{currentItems?.length}</b> of{" "}
                <b>{orders?.packages.length}</b> results
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
      </div>
    </Container>
  );
}

export default RecipientOrderTransaction;
