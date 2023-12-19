const express = require("express");
const router = express.Router();
const { requireAuthTDGD } = require("../middlewares/requireAuthDGD");
import {
  handleCreateNewEmployee,
  handleGetAllEmployees,
} from "../controllers/transactionManagerController";

// AUTHENTICATION
router.use(requireAuthTDGD);

router.post("/employee", handleCreateNewEmployee);
router.get("/employee", handleGetAllEmployees);

export default router;
