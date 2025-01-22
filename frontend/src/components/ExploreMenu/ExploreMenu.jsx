import React from "react";
import './ExploreMenu.css'
import { menu_list} from "../../assets/assets.js";

const ExploreMenu = ({category,setCategory}) => {

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Crafts</h1>
            <p className='explore-menu-text'>Discover a world of creativity and craftsmanship.
                Our collection features unique, handmade crochet pieces designed to bring warmth, style, and charm to your life.
                From cozy wearables to elegant home décor, there’s something for everyone.
                Dive into our categories and find the perfect addition to your wardrobe or home!
            </p>
            <div className='explore-menu-list'>
                {menu_list.map((item,index)=>{
                    return (
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=""/>
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr/>
        </div>
    )
}

export default ExploreMenu