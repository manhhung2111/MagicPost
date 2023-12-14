const express = require("express");
const router = express.Router();

const { requireAuthNVDTK } = require("../middlewares/requireAuthDTK");
import {
  handleVerifyShipment,
  handleGetResponsibleOrder,
  handleCreateShipment,
  handleGetAllDGD,
  handleGetShipmentToCurrentCenter,
} from "../controllers/nvdtkController";

// AUTHENTICATION
router.use(requireAuthNVDTK);

// FUNCTION

// xác nhận đơn hàng từ center khác tới
router.put("/order", async (req, res) => {
  console.log("halo");
  const result = await handleVerifyShipment(req);
  res.send(result);
});

// lấy ra các khu vực phụ trách
router.get("/locations", async (req, res) => {
  const result = await handleGetAllDGD(req);
  res.send(result);
});

// lấy ra các đơn hàng do GDV phụ trách
router.get("/responOrder", async (req, res) => {
  const result = await handleGetResponsibleOrder(req);
  res.send(result);
});

// tạo shipment mới
router.post("/shipment", async (req, res) => {
  const result = await handleCreateShipment(req);
  res.send(result);
});

// lấy tất cả các shipment đến center hiện tại
router.get("/shipment", async (req, res) => {
  const result = await handleGetShipmentToCurrentCenter(req);
  res.send(result);
});

export default router;
