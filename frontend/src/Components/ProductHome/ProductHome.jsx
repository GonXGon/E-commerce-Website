import React from 'react';
import "./ProductHome.css";

const ProductHome = () => {
    return (
        <div className="ProductHome-container">
            <div className="headingText-container">
                <h1>Our Products</h1>
            </div>
            <div className="productPreview-container">
                <h3>Image</h3>
                <h3>Name</h3>
                <h3>Price</h3>
                <button>Buy</button>
                <button>Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductHome