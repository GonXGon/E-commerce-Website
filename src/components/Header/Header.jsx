import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo-container">
                <h3>Logo</h3>
            </div>
            <div className="header-items">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/product">Products</Link></li>
                <li><Link to="/signup">Sign-Up</Link></li>
            </div>
        </div>
    )
}

export default Header