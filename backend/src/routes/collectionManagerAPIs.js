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
router.put("/employee-delete", handleDeleteEmployee);

router.post("/incoming-order", handleGetIncomingParcels);
router.post("/outgoing-order", handleGetOutgoingParcels);
router.get("/employee-contribution", handleGetEmployeeContribution);

export default router;
