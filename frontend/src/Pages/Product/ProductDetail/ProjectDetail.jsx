import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../../Features/cartSlice';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const productId = searchParams.get('id');
    
    fetch(`${process.env.REACT_APP_BACKEND_URL}products/detail?id=${productId}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [searchParams]);

  const handleAddToCart = async () => {
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
          quantity: quantity,
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
        quantity: quantity,
        img: product.img
      }));

      alert('Product added to cart successfully!');
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.message === 'Unauthorized') {
        alert("Unauthorized! Please log in again.");
      }
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/checkout');
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <div className="product-detail-image">
          {product.img && (
            <img src={`${process.env.REACT_APP_BACKEND_URL}${product.img}`} alt={product.name} />
          )}
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <p className="price">${product.price}</p>
          <p className="category">Category: {product.category}</p>
          
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <div className="button-container">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;