import React from "react";
import './Footer.css'
import {assets} from "../../assets/assets.js";

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt=""/>
                    <p>Explore our handcrafted creations, thoughtfully designed to bring beauty,
                        comfort, and uniqueness to your life. From elegant home décor to cozy apparel,
                        every piece tells a story of passion and craftsmanship.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt=""/>
                        <img src={assets.twitter_icon} alt=""/>
                        <img src={assets.linkedin_icon} alt=""/>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>

                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+254-700-000-090</li>
                        <li>KnotCompany@info.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">Copyright 2025 @Knot & companies.com - All Rights Reserved  |  Nexel </p>
        </div>
    )
}

export default Footer