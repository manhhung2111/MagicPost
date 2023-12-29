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
  handleGetAllIncomingAndOutgoing,
} from "../controllers/generalManagerControler";
import { requireAuthGD } from "../middlewares/requireAuthGD";

// AUTHENTICATION
// router.use(requireAuthGD);

router.post("/center", handleCreateNewCenter);

router.get("/dgd", handleGetAllDGDs);
router.get("/dtk", handleGetAllDTKs);
router.get("/tdgd", handleGetAllTDGDs);
router.get("/tdtk", handleGetAllTDTKs);
router.get("/incoming-orders", handleGetAllIncoming);
router.get("/outgoing-orders", handleGetAllOutgoing);
router.get("/stats", handleGetAllIncomingAndOutgoing);

export default router;
