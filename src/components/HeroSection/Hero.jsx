import React from 'react';
import './Hero.css';

const Hero = () => {
    return(
        <div className="hero-container">
            <div className="heroContent-container">
                <div className="heroText-container">
                    <h3>Deal of a product</h3>
                    <h2>Compelling Headline</h2>
                    <h3>Detail of product</h3>
                    <button>Buy Now!!</button>
                </div>
                <div className="image-container">
                    <h1>Image</h1>
                </div>
            </div>
        </div>
    )
}

export default Hero