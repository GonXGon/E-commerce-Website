import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../../Features/cartSlice';
import "../Product.css";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

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

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem('token'); 

        if (!token) {
            alert("You need to log in to add items to the cart.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    img: product.img 
                })
            });

            if (!response.ok) {
                throw new Error('Error adding product to cart');
            }

            // const result = await response.json();

            dispatch(addtoCart({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: 1,
                img: product.img 
            }));

        } catch (error) {
            console.error("Error adding to cart:", error);
            if (error.message === 'Unauthorized') {
                alert("Unauthorized! Please log in again.");
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="products-container">
            {products.map(product => (
                <div key={product._id} className="product-card">
                    {product.img && (
                        <img src={`http://localhost:5000/${product.img}`} alt={product.name} />
                    )}
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                    <div className="button-container">
                        <button onClick={() => handleAddToCart(product)}>Add to cart</button>
                        <button>Buy now</button>
                        <button>Add to wishlist</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductPage;
