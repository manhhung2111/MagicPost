const express = require("express");
const router = express.Router();

const { requireAuthTDGD } = require("../middlewares/requireAuthDGD");
import {
  handleCreateGDV,
  handleGetAllGDV,
  handleGetAllOrderDGD,
} from "../controllers/tgdController";

// AUTHENTICATION
router.use(requireAuthTDGD);

// FUNCTION

// tạo GDV, Shipper mới
router.post("/user", async (req, res) => {
  const result = await handleCreateGDV(req);
  res.send(result);
});


export default router;
