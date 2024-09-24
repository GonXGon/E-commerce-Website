import React from 'react';
import "../Product.css";

const ProductPage = () => {
    return(
        <div className="products-container">
            <div className="product-card">
                {/* <img src="https://picsum.photos/200/300"/> */}
                <h2>Product 1</h2>
                <p>Product 1 description</p>
                <p>$10.00</p>
                <div className="button-container">
                    <button>Add to cart</button>
                    <button>Buy now</button>
                    <button>Add to wishlist</button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage