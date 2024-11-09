import React, { useState } from 'react';
import '../Pages/Login.css';
import axios from "axios";
import Navbar from '../Components/Navbar';
import { GoogleLogin } from '@react-oauth/google';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import SignupBackground from '../assets/SignupBackground.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Validate inputs
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/login', { email, password });
            console.log("Response from server:", response.data); // Check server response
            
            // Redirect to home page after successful login
            navigate('/'); // Change '/home' to your actual home route

        } catch (error) {
            console.error("Error during login:", error.response ? error.response.data : error.message);
        }
    }

    return (
        <>
        <Navbar />
        <div className="login-main">
            <img src={SignupBackground} alt="" />
            <div className="login-container">
                <form className="login-container-form" onSubmit={handleLogin}>
                    <h3>Login</h3>
                    <input type="email" className='login-email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' /><br />
                    <input type="password" className='login-password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' /><br />
                    <button type='submit'>Sign In</button>
                    <NavLink to="/signup" style={{ textDecoration: 'none' }}><button type='button'>Sign Up</button></NavLink>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;
