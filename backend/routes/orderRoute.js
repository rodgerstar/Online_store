import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

// Route to place the order, including PayPal payment
orderRouter.post("/place", authMiddleware, placeOrder);

// Route to verify the order status post-payment
orderRouter.post("/verify", verifyOrder);

export default orderRouter;
