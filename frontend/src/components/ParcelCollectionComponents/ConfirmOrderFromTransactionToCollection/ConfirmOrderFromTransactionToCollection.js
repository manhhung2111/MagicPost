import Select from "react-select";
import Container from "react-bootstrap/Container";
import "./ConfirmOrderFromTransactionToCollection.scss";
import ConfirmOrderFromTransactionToCollectionTable from "./ConfirmOrderFromTractionToCollectionTable";
import { useEffect, useState } from "react";
import { handleGetOrdersFromTransactionHubs } from "../../../services/collectionServices";
import Loader from "../../Utils/Loader/Loader";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
function ConfirmOrderFromTransactionToCollection({ itemsPerPage }) {
  const [orders, setOrders] = useState({});
  const [selectedHubs, setSelectedHubs] = useState([]);
  const [transactionHubs, setTransactionHubs] = useState([]);
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
    const transactionHubs = selectedHubs?.map((hub) => hub.value);
    const result = await handleGetOrdersFromTransactionHubs(
      sort,
      transactionHubs
    );
    if (result.errorCode === 0) {
      setOrders((prev) => result.data);
      setTransactionHubs((prev) =>
        result.data?.transactionHubs?.map((hub) => ({
          label: hub,
          value: hub,
        }))
      );
    }
  };

  useEffect(() => {
    // Fetch items from another resources.
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHubs, selectedSort]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(orders.packages?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(orders.packages?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, orders]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.packages?.length;
    setItemOffset(newOffset);
  };

  const sortBy = [
    { label: "Alphabetical", value: "Alphabetical" },
    { label: "Date (asc)", value: "Date (asc)" },
    { label: "Date (desc)", value: "Date (desc)" },
  ];

  return (
    <Container className="confirm-order-from-transaction-to-collection">
      <h2>Confirm orders from other transaction hub(s)</h2>
      <div className="pending-confirmation-orders">
        <div className="filter">
          <div className="left-content">
            <p>Select by transaction hub</p>
            <Select
              defaultValue={selectedHubs}
              isMulti
              options={transactionHubs}
              className="multi-select"
              placeholder={"Select/search transaction hubs"}
              onChange={setSelectedHubs}
            />
          </div>
          <div className="right-content">
            <p>Sort by</p>
            <div className="group-loader">
              {isDisableConfirm && (
                <div class="loading">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              <Select
                defaultValue={sortBy[0]}
                options={sortBy}
                className="multi-select"
                placeholder={"Sort by...."}
                onChange={setSelectedSort}
              />
            </div>
          </div>
        </div>
        {!Object.keys(orders).length && <Loader />}
        {Object.keys(orders).length > 0 && (
          <>
            <ConfirmOrderFromTransactionToCollectionTable
              orders={currentItems}
              isDisableConfirm={isDisableConfirm}
              setIsDisableConfirm={setIsDisableConfirm}
              fetchData={fetchData}
            />
            <div className="paginate">
              <p className="info">
                Showing <b>{currentItems?.length}</b> of{" "}
                <b>{orders?.totalOrders}</b> results
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

export default ConfirmOrderFromTransactionToCollection;
