import React, { useState } from 'react';
import './Checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartQuantity, removeCart } from '../../../Features/cartSlice';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });
    // const [cardInfo, setCardInfo] = useState({
    //     cardNumber: '',
    //     expiryDate: '',
    //     cvc: '',
    // });


    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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

    const handleRemove = async (product) => {
        const token = localStorage.getItem('token');
        const productId = product._id ? product._id : product;

        if(!token || !productId){
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // setCardInfo({ ...cardInfo, [name]: value });
        console.log(name, value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
        };

        if (!data.name || !data.email || !data.address || !data.city || !data.state || !data.zip) {
            alert('All fields are required');
            return;
        }

        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify(data), // Send data as JSON
            });

            if(!response.ok){
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            alert('Order placed successfully');
            setFormData({
                name: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zip: '',
            });
            // setCardInfo({
            //     cardNumber: '',
            //     expiryDate: '',
            //     cvc: '',
            // });
            console.log('Order placed:', result);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    }

    return (
        <div className='checkout'>
            <div className="checkout-content">
                <div className="checkout-container">
                    <h1 className="checkout-header">Checkout</h1>
                    <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Shipping Address</label>
                        <input type="text" name="address" placeholder="Enter your shipping address" value={formData.address} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="zip">Zip Code</label>
                        <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} required/>
                    </div>

                        {/* <div className="form-group">
                            <label htmlFor="card">Credit Card Number</label>
                            <input type="text" name="card" placeholder="XXXX-XXXX-XXXX-XXXX" value={formData.cardNumber} onChange={handleChange} required/>
                        </div>

                        <div className="form-group card-expiry">
                            <div>
                                <label htmlFor="expiry">Expiry Date</label>
                                <input type="text" name="expiry" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="cvc">CVC</label>
                                <input type="text" name="cvc" placeholder="CVC" value={formData.cvc} onChange={handleChange} required/>
                            </div>
                        </div> */}

                        <button className="checkout-btn" type="submit">Complete Purchase</button>
                    </form>
                </div>

                <div className="cart-container">
                    <h2>Your Cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div className="cart-item" key={item.productId}>
                                    <img src={`${process.env.REACT_APP_BACKEND_URL}${item.img}`} alt={item.name} />
                                    <div>
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
                                    </div>
                                    <div className="button-container">
                                        <button onClick={() => handleRemove(item.productId)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                            <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
