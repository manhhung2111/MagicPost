const express = require("express");
const router = express.Router();

import { handleCreateNewCenter } from "../controllers/generalManagerControler";
import { requireAuthGD } from "../middlewares/requireAuthGD";

// AUTHENTICATION
// router.use(requireAuthGD);

router.post("/center", handleCreateNewCenter);

export default router;
