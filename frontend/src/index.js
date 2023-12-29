import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrackingPage from "./pages/TrackingPage";
import ParcelTransactionPage from "./pages/ParceTransactionPage";
import TransactionManagementPage from "./pages/TransactionManagementPage";
import PageNotFound from "./components/Utils/404Page/PageNotFound";
import AccessDeny from "./components/Utils/403Page/AccessDeny";
import ParcelCollectionPage from "./pages/ParcelColllectionPage";
import CollectionManagementPage from "./pages/CollectionManagementPage";
import PrivateRoute from "./components/Utils/PrivateRoute";
import ShipmentPage from "./pages/ShipmentPage";
import GeneralManagementPage from "./pages/GeneralManagementPage";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="tracking" element={<TrackingPage />} />
          <Route
            path="parcel-transaction"
            element={
              <PrivateRoute expectedRole={"GDV"}>
                <ParcelTransactionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="shipment"
            element={
              <PrivateRoute expectedRole={"GDV"}>
                <ShipmentPage />
              </PrivateRoute>
            }
          />
          <Route
            path="transaction-management"
            element={
              <PrivateRoute expectedRole={"GDT"}>
                <TransactionManagementPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="parcel-collection"
            element={
              <PrivateRoute expectedRole={"TKV"}>
                <ParcelCollectionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="collection-management"
            element={
              <PrivateRoute expectedRole={"TKT"}>
                <CollectionManagementPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="general-management"
            element={
              <PrivateRoute expectedRole={"TGD"}>
                <GeneralManagementPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="access-deny" element={<AccessDeny />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="light"
    />
  </div>
);
