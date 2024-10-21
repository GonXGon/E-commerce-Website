import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const user = {
                email,
                password
            }
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            console.log(data);
            if(response.ok){
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify({ firstname: data.user.firstname, lastname: data.user.lastname }));
                alert("Login successful");
                setEmail("");
                setPassword("");
                navigate('/');
            }else{
                alert("Login failed");
                console.log( email, password);
                console.log("Login failed:", data);
            }
        }catch(error){
            console.log("Error: ", error);
        }
    }

    return(
        <div className="login-container">
            <h1>Log In</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <div className='loginbutton-container'>
                    <button type="submit">Log In</button> 
                </div>
            </form>
            <p>Need to Sign Up? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}

export default Login