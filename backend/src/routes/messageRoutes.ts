import express from "express";
import { protect } from "../middleware/auth";
import { getOlderMessages } from "../controllers/messgaeController";
const router = express.Router();


router.get("older",protect,getOlderMessages); 

export default router;