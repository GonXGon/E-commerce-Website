import React from 'react';
import Hero from '../../components/HeroSection/Hero';
import ProductHome from '../../components/ProductHome/ProductHome';
import './Home.css';


const Home = () => {
    return(
        <div classname="Home-container">
            <div className="heroSection">
                <Hero />
            </div>
            <div className="productHome">
                <ProductHome />
            </div>
        </div>
    )
}

export default Home