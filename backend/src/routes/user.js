const express = require("express");
const router = express.Router();
import jwt from "jsonwebtoken";

const {
  handleUserLogin,
  handleGetParcelID,
} = require("../controllers/userController");

// đăng nhập
router.post("/login", handleUserLogin);

// tra cứu đơn hàng
router.get("/order", async (req, res) => {
  const data = req.query.id;
  console.log(data);
  const result = await handleGetParcelID(data);
  res.send(result);
});

//verify user
router.get("/verify", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // get token
  const token = authorization.split(" ")[1];

  // authentication
  try {
    const { role_name, user_name, center_name } = jwt.verify(
      token,
      process.env.SECRET
    );
    return res.status(200).json({
      errorCode: 0,
      data: role_name,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
});

export default router;
