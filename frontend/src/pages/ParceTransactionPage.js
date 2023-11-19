import Container from "react-bootstrap/Container";
import "./Pages.scss";
import { NavLink, Outlet } from "react-router-dom";
import { BiPackage } from "react-icons/bi";
import { LuFileSpreadsheet, LuPackageCheck } from "react-icons/lu";
import {
  TbTruckDelivery,
  TbPackageImport,
  TbPackageExport,
} from "react-icons/tb";
import { IoBarChartOutline } from "react-icons/io5";
function ParcelTransactionPage() {
  return (
    <Container className="parcel-transaction-page">
      <div className="side-bar">
        <h3>
          <BiPackage className="icon" />
          Magic Post
        </h3>
        <NavLink to={""} className="nav-link" end>
          <LuFileSpreadsheet className="icon" />
          Create sender's order
        </NavLink>
        <NavLink to={"./delivery-order-collection-point"} className="nav-link" end>
          <TbPackageExport className="icon" />
          Create order to collection hub
        </NavLink>
        <NavLink to={"./confirm-order-collection-point"} className="nav-link">
          <TbPackageImport className="icon" />
          Confirm orders from collection hub
        </NavLink>
        <NavLink to={"./recipient-order"} className="nav-link">
          <TbTruckDelivery className="icon" />
          Create delivery order for recipients
        </NavLink>
        <NavLink to={"./confirm-recipient-order"} className="nav-link">
          <LuPackageCheck className="icon" />
          Confirm recipients' orders
        </NavLink>
        <NavLink to={"./statistics"} className="nav-link">
          <IoBarChartOutline className="icon" />
          Parcels' status statistics
        </NavLink>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </Container>
  );
}

export default ParcelTransactionPage;
