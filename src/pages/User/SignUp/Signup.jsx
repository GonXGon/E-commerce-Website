import React from 'react';
import "./Signup.css";
import { Link } from 'react-router-dom';

const Signup = () => {
    return(
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form className="signup-form">
                <label>Username:</label>
                <input type="text" name="username" required/>
                <label>Email:</label>
                <input type="email" name="email" required/>
                <label>Password:</label>
                <input type="password" name="password" required/>
                <div className='button-container'>
                    <button type="submit">Sign Up</button> 
                </div>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Signup