import React, {useContext} from "react";
import './PlaceOrder.css'
import {StoreContext} from "../../Context/StoreContext.jsx";

const PlaceOrder = () => {

    const {getTotalCartAmount} = useContext(StoreContext)

    return (
        <form className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder='First Name'/>
                    <input type="text" placeholder='Last Name'/>
                </div>
                <input type="email" placeholder='Email Adress'/>
                <input type="text" placeholder='County'/>
                <input type="text" placeholder='Town'/>
                <input type="text" placeholder='Zip Code'/>
                <input type="text" placeholder='Phone'/>
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>Ksh.{getTotalCartAmount() === 0 ? 0 : 200}</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>Ksh.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200}</b>
                        </div>
                    </div>
                    <button>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder