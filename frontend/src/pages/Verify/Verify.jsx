import React, { useContext, useEffect } from "react";
import './Verify.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";
import axios from "axios";

const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    console.log("API URL:", url);
    const navigate = useNavigate();

    const verifyPayment = async () => {
    try {
        const response = await axios.post(url + "api/order/verify", { success, orderId });
        console.log(response.data);  // Log response to debug
        if (response.data.success) {
            // Reload the page to make sure data is fresh, or navigate directly to /myorders
            navigate("/myorders");
        } else {
            navigate("/");
        }
    } catch (error) {
        console.log("Error verifying payment", error);
        navigate("/");
    }
};


    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
