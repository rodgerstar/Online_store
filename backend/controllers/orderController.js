import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from "axios"; // For handling PayPal requests

const paypalClientId = process.env.PAYPAL_CLIENT_ID;
const paypalSecret = process.env.PAYPAL_SECRET;
const paypalUrl = "https://api-m.sandbox.paypal.com"; // Use PayPal Sandbox environment

// Placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"; // Your frontend URL

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare PayPal order data
        const orderItems = req.body.items.map((item) => ({
            name: item.name,
            unit_amount: { currency_code: "KES", value: (item.price).toFixed(2) },
            quantity: item.quantity,
        }));

        // Add delivery charges to PayPal order
        orderItems.push({
            name: "Delivery Charges",
            unit_amount: { currency_code: "KES", value: "200.00" },
            quantity: "1",
        });

        // Create order on PayPal API
        const paypalOrderData = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "KES",
                        value: (req.body.amount + 200).toFixed(2), // Total amount with delivery
                        breakdown: {
                            item_total: { currency_code: "KES", value: req.body.amount.toFixed(2) },
                            shipping: { currency_code: "KES", value: "200.00" },
                        },
                    },
                    items: orderItems,
                },
            ],
            application_context: {
                return_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            },
        };

        // Make a request to PayPal API to create the order
        const response = await axios.post(`${paypalUrl}/v2/checkout/orders`, paypalOrderData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(`${paypalClientId}:${paypalSecret}`).toString("base64")}`,
            },
        });

        const approvalUrl = response.data.links.find(link => link.rel === "approve").href;

        // Respond with PayPal approval URL
        res.json({ success: true, session_url: approvalUrl });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Order placement failed." });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            // Update the order to mark as paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "paid" });
            res.json({ success: true, message: "Paid" });
        } else {
            // Optionally update the order instead of deleting it
            await orderModel.findByIdAndUpdate(orderId, { payment: false, status: "failed" });
            res.json({ success: false, message: "Payment not completed. Order canceled." });
        }
    } catch (error) {
        console.error("Error during verification:", error.message);
        res.json({ success: false, message: "Order verification failed" });
    }
};

export { placeOrder, verifyOrder };
