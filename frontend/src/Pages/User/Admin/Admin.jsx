import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Admin.css";

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const token = localStorage.getItem('token');  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                // If user is admin, allow access to the page
                if (response.ok && data.isAdmin) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);  // Redirect non-admin users
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsAdmin(false);  // Redirect on error
                navigate('/');
            }
        };

        if (token) {
            fetchUserData();  // Fetch user data if token exists
        } else {
            navigate('/login');  // Redirect to login if not authenticated
        }
    }, [token, navigate]);

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
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}products`, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            
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

    if (isAdmin === null) {
        return <div>Loading...</div>;
    }

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
