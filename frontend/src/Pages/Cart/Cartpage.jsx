import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCart, updateCartQuantity } from '../../Features/cartSlice';
import { Link } from 'react-router-dom';
import "./Cart.css";

const Cartpage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemove = async (product) => {
        const token = localStorage.getItem('token');
        const productId = product._id ? product._id : product;

        if (!token || !productId) {
            console.error("Missing token or productId");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}cart/${productId}`, {
                method: 'DELETE',
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            });

            if (!response.ok) {
                throw new Error('Error removing product from cart');
            }

            dispatch(removeCart(productId));
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const handleQuantityChange = async (productId, quantity) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Missing token");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}cart/quantity`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                    quantity
                })
            });

            if (!response.ok) {
                throw new Error('Error updating cart quantity');
            }

            dispatch(updateCartQuantity({ productId, quantity }));
        } catch (error) {
            console.error("Error updating cart quantity:", error);
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className='cart-section'>
            <div className='cart-header'>
                <h1>Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className='cart-details-section'>
                        {cartItems.map((item) => (
                            <div key={item.productId} className='details'>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}${item.img}`} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                                <p>Quantity:{" "}
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(item.productId, Number(e.target.value))
                                        }
                                    />
                                </p>
                                <div className="button-container">
                                    <button onClick={() => handleRemove(item.productId)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='cart-total-section'>
                <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                <Link to="/checkout">
                    <button>Proceed to Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default Cartpage;
