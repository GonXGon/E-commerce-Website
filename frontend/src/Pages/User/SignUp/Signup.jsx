import React,{useState} from 'react';
import "./Signup.css";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            firstname: firstName,
            lastname: lastName,   
            email,
            password,
            isAdmin,
            adminPassword: isAdmin ? adminPassword : undefined,
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
                setAdminPassword("");
                setIsAdmin(false);
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
    const handleAdminCheckbox = (e) => {
        setIsAdmin(e.target.checked);  
    };

    return(
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <label>First Name:</label>
                <input type="text" name="firstname" value={firstName} onChange={(e) => setfirstName(e.target.value)} required/>

                <label>Last Name:</label>
                <input type="text" name="lastname" value={lastName} onChange={(e) => setlastName(e.target.value)} required/>

                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <label>
                    <input type='checkbox' checked={isAdmin} onChange={handleAdminCheckbox}/> Admin
                </label>
                {isAdmin && (
                    <>
                        <label>Admin Password:</label>
                        <input type="password" name="adminPassword" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required={isAdmin} />
                    </>
                )}

                <div className='button-container'>
                    <button type="submit">Sign Up</button> 
                </div>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Signup