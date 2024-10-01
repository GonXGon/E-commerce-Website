import React, { useState, useEffect } from 'react';
import "../Product.css";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/products') 
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <div className="products-container">
            {products.map(product => (
                <div key={product._id} className="product-card">
                    <h2>{product.name}</h2> 
                    <p>{product.description}</p> 
                    <p>${product.price}</p> 
                    <div className="button-container">
                        <button>Add to cart</button>
                        <button>Buy now</button>
                        <button>Add to wishlist</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductPage;
