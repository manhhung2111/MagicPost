const express = require("express");
const router = express.Router();
const { requireAuthTDGD } = require("../middlewares/requireAuthDGD");
import {
  handleCreateNewEmployee,
  handleGetAllEmployees,
  handleUpdateEmployee,
  handleDeleteEmployee,
  handleGetIncomingParcels,
  handleGetOutgoingParcels,
  handleGetEmployeeContribution,
} from "../controllers/transactionManagerController";

// AUTHENTICATION
router.use(requireAuthTDGD);

router.get("/employee", handleGetAllEmployees);
router.put("/employee", handleUpdateEmployee);
router.post("/employee", handleCreateNewEmployee);
router.delete("/employee", handleDeleteEmployee);

router.get("incoming-order", handleGetIncomingParcels);
router.get("outgoing-parcel", handleGetOutgoingParcels);
router.get("employee-contribution", handleGetEmployeeContribution);

export default router;
