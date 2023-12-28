const express = require("express");
const router = express.Router();
const { requireAuthTDTK } = require("../middlewares/requireAuthDTK");
import {
  handleCreateNewEmployee,
  handleGetAllEmployees,
  handleUpdateEmployee,
  handleDeleteEmployee,
  handleGetIncomingParcels,
  handleGetOutgoingParcels,
  handleGetEmployeeContribution,
} from "../controllers/collectionManagerController";

// AUTHENTICATION
router.use(requireAuthTDTK);

router.get("/employee", handleGetAllEmployees);
router.put("/employee", handleUpdateEmployee);
router.post("/employee", handleCreateNewEmployee);
router.delete("/employee", handleDeleteEmployee);

router.get("/incoming-order", handleGetIncomingParcels);
router.get("/outgoing-parcel", handleGetOutgoingParcels);
router.get("/employee-contribution", handleGetEmployeeContribution);

export default router;
