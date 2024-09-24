import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {
    return(
        <div className="login-container">
            <h1>Log In</h1>
            <form className="login-form">
                <label>Email:</label>
                <input type="email" name="email" required/>
                <label>Password:</label>
                <input type="password" name="password" required/>
                <div className='loginbutton-container'>
                    <button type="submit">Log In</button> 
                </div>
            </form>
            <p>Need to Sign Up? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}

export default Login