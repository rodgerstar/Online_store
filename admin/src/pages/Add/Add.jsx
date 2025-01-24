import React, { useState } from "react";
import './Add.css';
import { assets } from "../../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Crochet Apparel & Wearables"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/yarn/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Crochet Apparel & Wearables"
            });
            setImage(false);
            toast.success(response.data.message);

        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name='name'
                        placeholder='Type here'
                        autoComplete="name"
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder='Write content here'
                        autoComplete="off"
                        required
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" autoComplete="off">
                            <option value="Crochet Apparel & Wearables">Crochet Apparel & Wearables</option>
                            <option value="Crochet Accessories">Crochet Accessories</option>
                            <option value="Crochet Home Décor">Crochet Home Décor</option>
                            <option value="Seasonal & Themed Crochet Items">Seasonal & Themed Crochet Items</option>
                            <option value="Everyday Crochet Items">Everyday Crochet Items</option>
                            <option value="Crochet Pet Products">Crochet Pet Products</option>
                            <option value="Outdoor Crochet Items">Outdoor Crochet Items</option>
                            <option value="Crochet Bedding">Crochet Bedding</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name='price'
                            placeholder='ksh.999'
                            autoComplete="off"
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
