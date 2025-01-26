import React, { useContext, useState } from "react";
import './PlaceOrder.css';
import { StoreContext } from "../../Context/StoreContext.jsx";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PlaceOrder = () => {
    const { getTotalCartAmount, token, yarn_piece, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        county: "",
        city: "",
        town: "",
        zipcode: "",
        phone: ""
    });

    const [orderData, setOrderData] = useState(null); // Holds the order details after placing the order

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        yarn_piece.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderDetails = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 200,
        };

        setOrderData(orderDetails); // Store the order data temporarily for PayPal

        try {
            let response = await axios.post(url + "/api/order/place", orderDetails, { headers: { token } });
            if (response.data.success) {
                // Store session URL or any necessary data
                setOrderData({
                    ...orderDetails,
                    sessionUrl: response.data.session_url
                });
            } else {
                alert("Error: Payment session could not be initialized.");
            }
        } catch (error) {
            alert("Error placing the order. Please try again.");
        }
    };

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input
                        required
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        type="text"
                        placeholder="First Name"
                        autoComplete="given-name"
                    />
                    <input
                        required
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        type="text"
                        placeholder="Last Name"
                        autoComplete="family-name"
                    />
                </div>
                <input
                    required
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Email Address"
                    autoComplete="email"
                />
                <input
                    required
                    name="county"
                    onChange={onChangeHandler}
                    value={data.county}
                    type="text"
                    placeholder="County"
                    autoComplete="address-level1"
                />
                <input
                    required
                    name="town"
                    onChange={onChangeHandler}
                    value={data.town}
                    type="text"
                    placeholder="Town"
                    autoComplete="address-level2"
                />
                <input
                    required
                    name="zipcode"
                    onChange={onChangeHandler}
                    value={data.zipcode}
                    type="text"
                    placeholder="Zip Code"
                    autoComplete="postal-code"
                />
                <input
                    required
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="text"
                    placeholder="Phone"
                    autoComplete="tel"
                />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>Ksh.{getTotalCartAmount() === 0 ? 0 : 200}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>Ksh.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200}</b>
                        </div>
                    </div>

                    <button type="submit">PROCEED TO PAYMENT</button>

                    {/* PayPal Buttons */}
                    {orderData && orderData.sessionUrl && (
                        <PayPalScriptProvider options={{ "client-id": "AcqK36516K4PQH18GYQhtvopENIyFYUbDG_QBPJvCli6f9n_F4BlHnq1GvChL8mKulWVpWf0pAszil91" }}>
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: orderData.amount.toString(), // Total amount
                                                },
                                                shipping: {
                                                    address: {
                                                        address_line_1: orderData.address.town,
                                                        admin_area_2: orderData.address.county,
                                                        postal_code: orderData.address.zipcode,
                                                        country_code: "KE",
                                                    },
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        // Handle success payment here
                                        axios.post(url + "/api/order/verify", { orderId: orderData._id, success: "true" });
                                        alert("Payment Successful!");
                                    });
                                }}
                                onError={(err) => {
                                    alert("Payment failed: " + err.message);
                                }}
                            />
                        </PayPalScriptProvider>
                    )}
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
