const express = require("express");
const router = express.Router();
const { requireAuthTDGD } = require("../middlewares/requireAuthDGD");
import {
  handleCreateEmployeeAndShipper,
  handleGetAllEmployees,
} from "../controllers/transactionManagerController";

// AUTHENTICATION
router.use(requireAuthTDGD);

// create new employee, shipper
router.post("/employee", handleCreateEmployeeAndShipper);
router.get("/employee", handleGetAllEmployees);

export default router;
