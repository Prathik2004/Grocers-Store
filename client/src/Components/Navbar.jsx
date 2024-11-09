import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo1.png';
import Cart from '../assets/cart.png';
import User from '../assets/user.png';
import './Navbar.css';

const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleUserClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav className='navbar'>
            <img className='logo' src={Logo} alt="Logo" />
            <ul>
                <li>
                    <NavLink to='/' style={{ textDecoration: 'none' }}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/categories' style={{ textDecoration: 'none' }}>Categories</NavLink>
                </li>
                <li>
                    <NavLink to='/contactus' style={{ textDecoration: 'none' }}>ContactUs</NavLink>
                </li>
                <li>
                    <NavLink to='/feedback' style={{ textDecoration: 'none' }}>Feedback</NavLink>
                </li>
            </ul>
            <NavLink to="/cart"><img className='cart' src={Cart} alt="Cart" /></NavLink>

            <div className='user-dropdown'>
                <img className='user' src={User} alt="User" onClick={handleUserClick} />
                {dropdownVisible && (
                    <div className='dropdown-menu'>
                        <NavLink to='/profile'>Profile</NavLink>
                        <NavLink to='/login'>Login</NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
