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
router.put("/employee-delete", handleDeleteEmployee);

router.post("/incoming-order", handleGetIncomingParcels);
router.post("/outgoing-order", handleGetOutgoingParcels);
router.get("/employee-contribution", handleGetEmployeeContribution);

export default router;
