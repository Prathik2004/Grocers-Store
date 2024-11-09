import React, { useState } from 'react';
import axios from "axios";
import Navbar from '../Components/Navbar';
import { GoogleLogin } from '@react-oauth/google';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Pages/Signup.css';
import SignupBackground from '../assets/SignupBackground.png';

const Signup = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const submitSignup = async (e) => {
        e.preventDefault();
        
        // Validate inputs
        if (!name || !number || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        console.log({ name, number, email, password }); // Check what is being sent
        try {
            const response = await axios.post('http://localhost:8000/register', {
                name,
                number: Number(number),
                email,
                password
            });
            console.log("Response from server:", response.data); // Check server response
            
            // Redirect to home page after successful signup
            navigate('/'); // Change '/home' to your actual home route

        } catch (error) {
            console.error("Error during signup:", error.response ? error.response.data : error.message);
        }
    }

    return (
        <>
        <Navbar />
        <div className="signup-main">
            <img src={SignupBackground} alt="" className='' />
            <div className="signup-container">
                <form className="signup-container-form" onSubmit={submitSignup}>
                    <h3>Sign Up</h3>
                    <input type="text" className='login-name' onChange={(e) => { setName(e.target.value) }} placeholder='Name' /><br />
                    <input type="text" className='login-number' onChange={(e) => { setNumber(e.target.value) }} placeholder='Number' /><br />
                    <input type="email" className='login-email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' /><br />
                    <input type="password" className='login-password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' /><br />
                    
                    <button type='submit'>Sign Up</button>
                    <NavLink to="/login" style={{ textDecoration: 'none' }}><button type='submit'>Sign In</button></NavLink>
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

export default Signup;
