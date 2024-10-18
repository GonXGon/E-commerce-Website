import React, { useState } from 'react';
import "./Admin.css";

const Admin = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('quantity', formData.quantity);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('image', formData.image);

        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                body: data,
                headers: {
                    // 'Content-Type': 'multipart/form-data' - Not needed for fetch with FormData
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // Handle success
            alert('Product added successfully!');
            setFormData({
                name: '',
                price: '',
                quantity: '',
                category: '',
                description: '',
                image: null
            });
            console.log('Product added:', result);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <form className='form-container' onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} />

                <label>Price</label>
                <input type="number" name="price" required value={formData.price} onChange={handleChange} />

                <label>Available Quantity</label>
                <input type="number" name="quantity" required value={formData.quantity} onChange={handleChange} />

                <label>Category</label>
                <input type="text" name="category" required value={formData.category} onChange={handleChange} />

                <label>Description</label>
                <input type="text" name="description" required value={formData.description} onChange={handleChange} />

                <label>Image</label>
                <input type="file" name="image" required onChange={handleChange} />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default Admin;
