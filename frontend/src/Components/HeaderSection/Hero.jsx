import React from 'react';
import './Hero.css';
import img from '../../Assets/heroImage.jpeg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(path);
    }
    return (
        <div className="hero-container">
            <div className="heroContent-container">
                <div className="heroText-container">
                    <h1>PawPlay Toys</h1>
                    <h2>Unleash the Joy with PawPlay's Best Dog Toys!</h2>
                    <div className='button-container'>
                        <button onClick={() => handleClick('/products')}>Buy Now!!</button>
                        <button onClick={() => handleClick('/signup')}>Sign Up</button>
                    </div>
                </div>
                <div className="image-container">
                    <img src={img} alt="hero section" />
                </div>
            </div>
        </div>
    );
};

export default Hero;