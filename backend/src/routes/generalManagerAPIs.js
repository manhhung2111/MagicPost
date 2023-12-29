const express = require("express");
const router = express.Router();

import {
  handleCreateNewCenter,
  handleGetAllDGDs,
  handleGetAllDTKs,
  handleGetAllTDGDs,
  handleGetAllTDTKs,
  handleGetAllIncoming,
  handleGetAllOutgoing,
  handleCreateNewManager,
  handleUpdateManager,
  handleDeleteManager,
  handleGetCentersInfo,
  handleGetAllManager,
  handleGetTransactionStatistics,
  handleGetCollectionStatistics,
} from "../controllers/generalManagerController";

import { requireAuthGD } from "../middlewares/requireAuthGD";

// AUTHENTICATION
router.use(requireAuthGD);

router.post("/center", handleCreateNewCenter);

router.post("/manager", handleCreateNewManager);
router.put("/manager", handleUpdateManager);
router.put("/manager-delete", handleDeleteManager);
router.get("/center-info", handleGetCentersInfo);
router.get("/manager", handleGetAllManager);

router.get("/dgd", handleGetAllDGDs);
router.get("/dtk", handleGetAllDTKs);
router.get("/tdgd", handleGetAllTDGDs);
router.get("/tdtk", handleGetAllTDTKs);
router.get("/incoming-orders", handleGetAllIncoming);
router.get("/outgoing-orders", handleGetAllOutgoing);

router.get("/transaction-statistic", handleGetTransactionStatistics);
router.get("/collection-statistic", handleGetCollectionStatistics);

export default router;
