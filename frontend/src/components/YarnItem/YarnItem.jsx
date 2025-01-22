import React, { useContext } from "react";
import './YarnItem.css';
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../Context/StoreContext.jsx";

const YarnItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

    return (
        <div className='yarn-item'>
            <div className="yarn-item-img-container">
                <img className='yarn-item-image' src={image} alt=""/>
                {!cartItems?.[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt=""/>
                    : <div className='yarn-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt=""/>
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt=""/>
                      </div>
                }
            </div>
            <div className="yarn-item-info">
                <div className="yarn-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt=""/>
                </div>
                <p className='yarn-item-desc'>{description}</p>
                <p className="food-item-price">Ksh.{price}</p>
            </div>
        </div>
    );
};

export default YarnItem;
