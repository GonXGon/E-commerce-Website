import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return(
        <div className="footer-container">
            <div className="headline-container">
                <h2>Logo</h2>
                <h2>Compeling Headline </h2>
            </div>
            <div className="social-conatiner">
                <h2>Socials</h2>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Youtube</li>
            </div>
            <div className="email-container">
                <h2>Email</h2>
                <li>Shubhambanyal64@gmail.com</li>
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