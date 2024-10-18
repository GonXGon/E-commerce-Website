import React from 'react';
import Hero from '../../Components/HeaderSection/Hero';
import ProductHome from '../../Components/ProductHome/ProductHome';
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