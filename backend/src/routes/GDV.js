const express = require("express");
const router = express.Router();

const requireAuthGDV = require("../middlewares/requireAuthDGD");
import {
  handleCreateOrder,
  handleVerifyShipment,
  handleGetAllResponsibleLocations,
  handleGetResponsibleOrder,
  handleCreateShipment,
} from "../controllers/gdvController";

// AUTHENTICATION
router.use(requireAuthGDV);

// FUNCTION

// tạo order mới
router.post("/order", async (req, res) => {
  const data = req.body;
  const result = await handleCreateOrder(data);
  res.send(result);
});

// xác nhận đơn hàng từ center khác tới
router.put("/order", async (req, res) => {
  const data = req.body;
  const result = await handleVerifyShipment(data);
  res.send(result);
});

// lấy ra các khu vực phụ trách
router.get("/resLocations", async (req, res) => {
  const result = await handleGetAllResponsibleLocations();
  res.send(result);
});

// lấy ra các đơn hàng do GDV phụ trách 
router.get("/responOrder", async (req, res) => {
  const result = await handleGetResponsibleOrder();
  res.send(result);
});

// tạo shipment mới
router.post("/shipment", async (req, res) => {
  const data = req.body;
  const result = await handleCreateShipment(data);
  res.send(result);
});
