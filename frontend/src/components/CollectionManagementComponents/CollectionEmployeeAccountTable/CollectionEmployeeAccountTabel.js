import { useState } from "react";
import { FaList } from "react-icons/fa6";
import _ from "lodash";
import "./CollectionEmployeeAccountTabel.scss";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
function CollectionEmployeeAccountTable() {
  const [isShowSortIncoming, setIsShowSortIncoming] = useState(false);
  const [sortIncoming, setSortIncoming] = useState([
    { value: "Date", isSelected: true },
    { value: "Name", isSelected: false },
  ]);

  const employeeList = [
    {
      name: "Hoang Manh Hung",
      email: "manhhung@magic.post",
      phone: "09123456789",
      address: "University of Engineering and Technology",
      dateAdded: "Feb 23, 2023",
    },
    {
      name: "Hoang Hung Manh",
      email: "hungmanh@magic.post",
      phone: "09123456789",
      address: "University of Engineering and Technology",
      dateAdded: "April 1, 2023",
    },
    {
      name: "Phan Anh Duc",
      email: "anhduc@magic.post",
      phone: "09123456789",
      address: "University of Engineering and Technology",
      dateAdded: "May 21, 2023",
    },
    {
      name: "Phan Anh Duc",
      email: "anhduc@magic.post",
      phone: "09123456789",
      address: "University of Engineering and Technology",
      dateAdded: "May 21, 2023",
    },
    {
      name: "Phan Anh Duc",
      email: "anhduc@magic.post",
      phone: "09123456789",
      address: "University of Engineering and Technology",
      dateAdded: "May 21, 2023",
    },
  ];
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
    }
  };
  return (
    <div className="collection-employee-account-table">
      <div className="top">
        <h3>Manage employee accounts</h3>
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
      <div className="main-table">
        <header className="header">
          <div className="left-content">
            <h4>#</h4>
            <h4>Name</h4>
          </div>
          <div className="right-content">
            <h4>Phone number</h4>
            <h4>Address</h4>
            <h4>Date added</h4>
          </div>
        </header>
        <main>
          {employeeList?.map((employee, index) => {
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
                    <div className="date-added">{employee.dateAdded}</div>
                    <div className="actions">
                      <FiEdit2 className="edit" title="Edit" />{" "}
                      <MdDeleteOutline className="delete" title="Delete" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>
      <div className="bot">
        <p>
          Showing <b>5</b> of <b>25</b> reults
        </p>
      </div>
    </div>
  );
}

export default CollectionEmployeeAccountTable;
