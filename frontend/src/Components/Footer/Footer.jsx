import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from '../../Assets/Logo.jpeg';

const Footer = () => {
    return(
        <div className="footer-container">
            <div className="headline-container">
                <div className="logo-container">
                    <img src={Logo} alt='logo'/>
                </div>
                <h2>Unleash the Joy with PawPlay's Best Dog Toys!</h2>
            </div>
            <div className="social-conatiner">
                <h2>Socials</h2>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Youtube</li>
            </div>
            <div className="footer-items">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/product">Products</Link></li>
                <li><Link to="/signup">Sign-Up</Link></li>
            </div>
        </div>
    )
}

export default Footer