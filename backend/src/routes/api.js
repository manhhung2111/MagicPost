import express from "express";
import {
  handleCreateOrder,
  handleVerifyShipment,
  handleGetParcelID,
  handleGetAllResponsibleLocations,
} from "../controllers/gdvController";
import { handleGetDTK } from "../controllers/gdControler";
import {
  handleCreateGDV,
  handleGetAllGDV,
  handleGetAllOrderDGD,
} from "../controllers/tgdController";

const router = express.Router();

// Tổng giám đốc
router.get("/dtk", async (req, res) => {
  const result = await handleGetDTK();
  console.log(result);
  res.send(result);
});

// Trưởng điểm giao dịch
router.post("/gdv", async (req, res) => {
  const data = req.body;
  const result = await handleCreateGDV(data);
  res.send(result);
});

router.get("/gdv", async (req, res) => {
  const result = await handleGetAllGDV();
  res.send(result);
});

router.get("/orders-dgd", async (req, res) => {
  const result = await handleGetAllOrderDGD();
  res.send(result);
});

// Giao dịch viên
router.post("/order", async (req, res) => {
  const data = req.body;
  const result = await handleCreateOrder(data);
  res.send(result);
});

router.put("/order", async (req, res) => {
  const data = req.body;
  const result = await handleVerifyShipment(data);
  res.send(result);
});

router.get("/order", async (req, res) => {
  const data = req.query.id;
  const result = await handleGetParcelID(data);
  res.send(result);
});

router.get("/resLocations", async (req, res) => {
  const result = await handleGetAllResponsibleLocations();
  res.send(result);
});

router.post("/shipment", async (req, res) => {
  const data = req.body;
});

router.get("orders-all", async (req, res) => {});

export default router;
