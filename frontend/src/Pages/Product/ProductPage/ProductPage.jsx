import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addtoCart } from '../../../Features/cartSlice';
import "../Product.css";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}products`)
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
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}cart`, {
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

    const handleBuyNow = async(product) => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            alert("You need to log in to add items to the cart.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}cart`, {
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

        navigate('/checkout');
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="products-container">
            {products.map(product => (
                <div key={product._id} className="product-card" onClick={() => navigate(`/project-detail?id=${product._id}`)}>
                    {product.img && (
                        <img src={`${process.env.REACT_APP_BACKEND_URL}${product.img}`} alt={product.name} />
                    )}
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                    <div className="button-container">
                        <button onClick={() => handleAddToCart(product)}>Add to cart</button>
                        <button onClick={() => handleBuyNow(product)}>Buy now</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductPage;
