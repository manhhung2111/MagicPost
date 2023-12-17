const express = require("express");
const router = express.Router();

const { requireAuthGDV } = require("../middlewares/requireAuthDGD");
import {
  handleCreateOrder,
  handleVerifyShipment,
  handleGetParcelID,
  handleGetResponsibleOrder,
  handleCreateShipment,
  handleGetAllDGD,
  handleGetShipmentToCurrentCenter,
} from "../controllers/gdvController";

// AUTHENTICATION
router.use(requireAuthGDV);

// FUNCTION

// tạo order mới
router.post("/order", async (req, res) => {
  const result = await handleCreateOrder(req);
  res.send(result);
});

router.get("/order", async (req, res) => {
  const data = req.query.id;
  const result = await handleGetParcelID(data);
  res.send(result);
});

// xác nhận đơn hàng từ center khác tới
router.put("/order", async (req, res) => {
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
