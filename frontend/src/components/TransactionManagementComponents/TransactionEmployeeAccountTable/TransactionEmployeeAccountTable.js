import { useState, useEffect } from "react";
import { FaList } from "react-icons/fa6";
import "./TransactionEmployeeAccountTable.scss";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { handleGetAllEmployee } from "../../../services/transactionManagementServices";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Loader from "../../Utils/Loader/Loader";
import UpdateEmployeeAccountModal from "../UpdateEmployeeAccountModal/UpdateEmployeeAccountModal";
import DeleteEmployeeAccountModal from "../DeleteEmployeeAccountModal/DeleteEmployeeAccountModal";
function TransactionEmployeeAccountTable({ itemsPerPage, setCardsStatistics }) {
  const [isShowSort, setIsShowSort] = useState(false);
  const [sortEmployee, setSortEmployee] = useState("Name");
  const [employeeList, setEmployeeList] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmployeeInfo, setEditEmployeeInfo] = useState({
    user_name: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [deleteEmployeeUsername, setDeleteEmployeeUsername] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // paginate
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const sortOptions = ["Name"];
  const fetchData = async () => {
    if (Object.keys(employeeList).length > 0) {
      setEmployeeList({});
    }

    const result = await handleGetAllEmployee();
    if (result.errorCode === 0) {
      setTimeout(async () => {
        await setEmployeeList((prev) => result.data);
        setCardsStatistics((prev) => ({
          ...prev,
          totalEmployees: result.data.totalEmployee,
        }));
      }, 1500);
    }
    setItemOffset(0);
  };
  useEffect(() => {
    // Fetch items from another resources.
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortEmployee]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(employeeList?.packages?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(employeeList?.packages?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, employeeList]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % employeeList.packages?.length;
    setItemOffset(newOffset);
  };

  const handleRefresh = async () => {
    await fetchData();
  };

  const handleChangeSort = (value) => {
    setSortEmployee(value);
    setIsShowSort(false);
  };

  const handleShowEditEmployeeModal = async (employee) => {
    await setEditEmployeeInfo(employee);
    setShowEditModal(true);
  };

  const handleShowDeleteEmployeeModal = async (user_name) => {
    setDeleteEmployeeUsername(user_name);
    setShowDeleteModal(true);
  };

  return (
    <div className="transaction-employee-account-table">
      <div className="top">
        <h3>Manage employee accounts</h3>
        <div className="right-content">
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
          <p onClick={() => setIsShowSort((prev) => !prev)}>
            {sortEmployee}
            <FaList />
          </p>
          <ul className={`${isShowSort ? "active" : ""}`}>
            <p>Sort by</p>
            {sortOptions?.map((sort, index) => {
              return (
                <li
                  key={index}
                  className={`${sort === sortEmployee ? "active" : ""}`}
                  onClick={() => handleChangeSort(sort)}
                >
                  {sort}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="main-table">
        <header className="header">
          <div className="left-content">
            <h4>#</h4>
            <h4>Name</h4>
          </div>
          <div className="right-content">
            <h4>Phone number</h4>
            <h4>Address</h4>
            <h4>Username</h4>
          </div>
        </header>
        {!Object.keys(employeeList).length && <Loader />}
        {Object.keys(employeeList).length > 0 && (
          <main>
            {employeeList?.packages?.map((employee, index) => {
              return (
                <div key={index} className="table-row">
                  <div className="left-content">
                    <div>{index + 1}</div>
                    <div className="employee-info">
                      <img
                        src="https://plus.unsplash.com/premium_photo-1673264933446-203af90cd278?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D"
                        alt="employee-avatar"
                        className="img"
                      />
                      <div>
                        <h5>{employee.name}</h5> <p>{employee.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="right-content">
                    <div>{employee.phone}</div>
                    <div className="address">{employee.address}</div>
                    <div className="custom">
                      <div className="date-added">{employee.user_name}</div>
                      <div className="actions">
                        <FiEdit2
                          className="edit"
                          title="Edit"
                          onClick={() => handleShowEditEmployeeModal(employee)}
                        />{" "}
                        <MdDeleteOutline
                          className="delete"
                          title="Delete"
                          onClick={() =>
                            handleShowDeleteEmployeeModal(employee.user_name)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </main>
        )}
      </div>
      {Object.keys(employeeList).length > 0 && (
        <div className="paginate">
          <p className="info">
            Showing <b>{currentItems?.length}</b> of{" "}
            <b>{employeeList?.totalEmployee}</b> results
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
      )}
      <UpdateEmployeeAccountModal
        setShow={setShowEditModal}
        show={showEditModal}
        employeeInfo={editEmployeeInfo}
        fetchData={fetchData}
      />
      <DeleteEmployeeAccountModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        user_name={deleteEmployeeUsername}
        fetchData={fetchData}
      />
    </div>
  );
}

export default TransactionEmployeeAccountTable;
