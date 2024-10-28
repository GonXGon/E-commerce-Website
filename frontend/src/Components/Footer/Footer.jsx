import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from '../../Assets/Logo.jpeg';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="headline-container">
                <div className="logo-container">
                    <img src={Logo} alt='logo'/>
                </div>
                <h2>Unleash the Joy with PawPlay's Best Dog Toys!</h2>
            </div>
            <div className="social-container">
                <h2>Socials</h2>
                <ul>
                    <li><a href="#facebook">Facebook</a></li>
                    <li><a href="#instagram">Instagram</a></li>
                    <li><a href="#youtube">Youtube</a></li>
                </ul>
            </div>
            <nav className="footer-items">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/signup">Sign-Up</Link></li>
            </nav>
        </footer>
    )
}

export default Footer