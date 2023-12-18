const express = require("express");
const router = express.Router();
const {
  handleLoginUser,
  handleGetParcelById,
  handleVerifyUser,
} = require("../controllers/userController");

router.post("/login", handleLoginUser); // login
router.get("/order", handleGetParcelById); // parcel tracking
router.get("/verify", handleVerifyUser); //verify user

export default router;
