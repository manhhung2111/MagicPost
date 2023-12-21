const express = require("express");
const router = express.Router();
const { requireAuthTDGD } = require("../middlewares/requireAuthDGD");
import {
  handleCreateNewEmployee,
  handleGetAllEmployees,
} from "../controllers/transactionManagerController";

// AUTHENTICATION
router.use(requireAuthTDGD);

router.get("/employee", handleGetAllEmployees);
router.put("/employee");
router.post("/employee", handleCreateNewEmployee);

export default router;
