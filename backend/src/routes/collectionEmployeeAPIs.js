const express = require("express");
const router = express.Router();

const { requireAuthNVDTK } = require("../middlewares/requireAuthDTK");
import {
  handleVerifyShipment,
  handleGetResponsibleOrder,
  handleCreateShipment,
  handleGetAllTransactionAndCollectionsCenter,
  handleGetShipmentToCurrentCenter,
} from "../controllers/collectionEmployeeController";

// AUTHENTICATION
router.use(requireAuthNVDTK);

// confirm order from transaction || collection
router.put("/order", handleVerifyShipment);

// lấy ra các khu vực phụ trách
router.get("/locations", handleGetAllTransactionAndCollectionsCenter);

// lấy ra các đơn hàng do GDV phụ trách
router.get("/responsibleOrder", handleGetResponsibleOrder);

// create shipment to next center
router.post("/shipment", handleCreateShipment);

// get all incoming shipments
router.get("/shipment", handleGetShipmentToCurrentCenter);

export default router;
