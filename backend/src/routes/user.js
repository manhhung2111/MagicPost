const express = require("express");
const router = express.Router();

const {
  handleUserLogin,
  handleGetParcelID,
} = require("../controllers/userController");

// đăng nhập
router.post("/login", handleUserLogin);

// tra cứu đơn hàng
router.get("/order", async (req, res) => {
  const data = req.query.id;
  const result = await handleGetParcelID(data);
  res.send(result);
});

export default router;
