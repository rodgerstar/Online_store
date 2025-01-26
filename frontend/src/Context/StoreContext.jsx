import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [yarn_piece, setYarnPiece] = useState([]);
    const url = "http://localhost:4000";

    // PayPal integration state
    const [paypalPayment, setPaypalPayment] = useState(null);

    const addToCart = async (itemId) => {
        try {
            if (token) {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            }
            setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            if (token) {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            }
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        const yarnMap = yarn_piece.reduce((acc, product) => {
            acc[product._id] = product;
            return acc;
        }, {});

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = yarnMap[item];
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchYarnPiece = async () => {
        try {
            const response = await axios.get(url + "/api/yarn/list");
            setYarnPiece(response.data.data);
        } catch (error) {
            console.error("Error fetching yarn pieces:", error);
        }
    };

    const loadCartData = async (token) => {
        if (!token) return;
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // New function to initialize PayPal payment
    const initializePaypalPayment = async () => {
        const totalAmount = getTotalCartAmount(); // Get the total cart amount
        try {
            const response = await axios.post(url + "/api/paypal/create-payment", { amount: totalAmount }, { headers: { token } });
            if (response.data.success) {
                setPaypalPayment(response.data.payment);  // Store PayPal payment data for use
            }
        } catch (error) {
            console.error("Error initializing PayPal payment:", error);
        }
    };

    // Function to handle successful PayPal payment
    const handlePaypalPaymentSuccess = async (paymentID) => {
        try {
            const response = await axios.post(url + "/api/paypal/execute-payment", { paymentID }, { headers: { token } });
            if (response.data.success) {
                // Payment successfully processed
                console.log("Payment successful!");
                // You might want to update cart items, clear cart, or notify the user here
            }
        } catch (error) {
            console.error("Error executing PayPal payment:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchYarnPiece();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        yarn_piece,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        paypalPayment,
        initializePaypalPayment,
        handlePaypalPaymentSuccess,
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
