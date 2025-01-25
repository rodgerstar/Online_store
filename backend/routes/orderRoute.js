import express from "express";

import auth from "../middleware/auth.js";
import {placeOrder} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);


export default orderRouter;