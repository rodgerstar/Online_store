import React, { useContext } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import './YarnDisplay.css';
import { StoreContext } from "../../Context/StoreContext.jsx";
import YarnItem from "../YarnItem/YarnItem.jsx";

const YarnDisplay = ({ category }) => {
    const { yarn_piece } = useContext(StoreContext);


    return (
        <div className='yarn-display' id='yarn-display'>
            <h2>Top Crafts Near You!</h2>
            <div className="yarn-display-list">
                {yarn_piece.map((item, index) => {
                    if (category==="All" || category===item.category) {
                        return <YarnItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                            }

                })}
            </div>
        </div>
    );
};

// Add prop validation for 'category'
YarnDisplay.propTypes = {
    category: PropTypes.string.isRequired, // Ensure category is a required string
};

export default YarnDisplay;
