import React, { useState, useEffect } from 'react';
import "./ProductHome.css";

const ProductHome = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}products`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error("Error fetching the products:", error));
    }, []);

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? products.length - 1 : currentIndex - 1);
    };
    const nextSlide = () => {
        setCurrentIndex(currentIndex === products.length - 1 ? 0 : currentIndex + 1);
    };

    if(!products.length){
        return <div>Loading...</div>;
    }
    return (
        <div className="ProductHome-container">
            <h1>Our Products</h1>
            <div className="productPreview-container">
                <button className='prev-button' onClick={prevSlide}>&#10094;</button>
                <div className='productPrevirew-Slide'>
                    <img src={`${process.env.REACT_APP_BACKEND_URL}${products[currentIndex].img}`} alt={products[currentIndex].name} />
                    <h3>{products[currentIndex].name}</h3>
                    <p>Price: ${products[currentIndex].price}</p>
                    <button>Add to Cart</button>
                </div>
                <button className='next-button' onClick={nextSlide}>&#10095;</button>
            </div>
        </div>
    )
}

export default ProductHome