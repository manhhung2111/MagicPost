const express = require("express");
const router = express.Router();

const { requireAuthNVDTK } = require("../middlewares/requireAuthDTK");
import {
  handleConfirmIncomingCollectionOrder,
  handleGetNearbyTransactionHubs,
  handleGetIncomingCollectionOrder,
  handleGetNearbyCollectionHubs,
  handleTransferOrdersToCollectionHub,
  handleTransferOrdersToTransactionHub,
  handleGetIncomingTransactionOrder,
  handleConfirmIncomingTransactionOrder,
  handleGetOrdersToTransferTransaction,
  handleGetOrdersToTransferCollection,
  handleGetStatsOrders, handleGetContribution
} from "../controllers/collectionEmployeeController";

// AUTHENTICATION
router.use(requireAuthNVDTK);

// get and confirm incoming order from other collecion hubs
router.post("/collection/incoming-order", handleGetIncomingCollectionOrder);
router.put("/collection/incoming-order", handleConfirmIncomingCollectionOrder);

// get all nearby collection hubs and transfer orders to collection hub
router.get("/collection-nearby", handleGetNearbyCollectionHubs);
router.get("/transfer/order-collection", handleGetOrdersToTransferCollection);
router.put("/transfer/order-collection", handleTransferOrdersToCollectionHub);

// get and confirm incoming order from other transaction hubs
router.post("/transaction/incoming-order", handleGetIncomingTransactionOrder);
router.put(
  "/transaction/incoming-order",
  handleConfirmIncomingTransactionOrder
);

// get nearby transaction hubs and transfer orders to tranasction hub
router.get("/transfer/order-transaction", handleGetOrdersToTransferTransaction);
router.get("/transaction-nearby", handleGetNearbyTransactionHubs);
router.put("/transfer/order-transaction", handleTransferOrdersToTransactionHub);

// get success and unsuccess orders
router.get("/order/stats", handleGetStatsOrders);
router.get("/contribution", handleGetContribution)
export default router;
