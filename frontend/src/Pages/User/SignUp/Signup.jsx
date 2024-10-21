import React,{useState} from 'react';
import "./Signup.css";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            firstname: firstName,
            lastname: lastName,   
            email,
            password
        };
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if(response.ok){
                setEmail("");
                setPassword("");
                setfirstName("");
                setlastName("");
                alert("User created Successfully")
                navigateLogin();
            }else{
                alert("Something went wrong");
            }
            
        }catch(error){
            console.error('Error:', error);
        }
    };
    const navigateLogin = () => {
        navigate('/login');
    }

    return(
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" name="firstname" value={firstName} onChange={(e) => setfirstName(e.target.value)} required/>
                <label>Last Name:</label>
                <input type="text" name="lastname" value={lastName} onChange={(e) => setlastName(e.target.value)} required/>
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <div className='button-container'>
                    <button type="submit">Sign Up</button> 
                </div>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Signup