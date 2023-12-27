import Select from "react-select";
import Container from "react-bootstrap/Container";
import "./ConfirmOrderFromCollectionToCollection.scss";
import ConfirmOrderFromCollectionToCollectionTable from "./ConfirmOrderFromCollectionToCollectionTable";
import { useEffect, useState } from "react";
import { handleGetOrdersFromTransactionHubs } from "../../../services/collectionServices";
import Loader from "../../Utils/Loader/Loader";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
function OrderFromCollectionToCollection({ itemsPerPage }) {
  const [orders, setOrders] = useState({});
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const fetchData = async () => {
    const result = await handleGetOrdersFromTransactionHubs();
    if (result.errorCode === 0) {
      setOrders((prev) => result.data);
    }
  };

  useEffect(() => {
    // Fetch items from another resources.
    fetchData();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(orders.packages?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(orders.packages?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, orders]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.packages?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const collectionHubs = [
    { label: "TK1", value: "TK1" },
    { label: "TK2", value: "TK2" },
  ];
  const sortBy = [
    { label: "Alphabetical", value: "Alphabetical" },
    { label: "Date (asc)", value: "Date (asc)" },
    { label: "Date (desc)", value: "Date (desc)" },
  ];
  return (
    <Container className="confirm-order-from-collection-to-collection">
      <h2>Confirm orders from other collection hub(s)</h2>
      <div className="pending-confirmation-orders">
        <div className="filter">
          <div className="left-content">
            <p>Select by collection hub</p>
            <Select
              defaultValue={[]}
              isMulti
              options={collectionHubs}
              className="multi-select"
              placeholder={"Select collection hubs"}
            />
          </div>
          <div className="right-content">
            <p>Sort by</p>
            <Select
              defaultValue={sortBy[0]}
              options={sortBy}
              className="multi-select"
              placeholder={"Sort by...."}
            />
          </div>
        </div>
        {!Object.keys(orders).length && <Loader />}
        {Object.keys(orders).length > 0 && (
          <>
            <ConfirmOrderFromCollectionToCollectionTable
              orders={currentItems}
            />
            <div className="paginate">
              <p className="info">Showing <b>{currentItems?.length}</b> of <b>{orders?.totalOrders}</b> results</p>
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

export default OrderFromCollectionToCollection;
