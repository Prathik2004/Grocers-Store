import React, { useState } from 'react'
import './Footer.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const [issubmitted, setissubmitted] = useState(false)

  const handlefootersubmit = (e) => {
    e.preventDefault();
    setissubmitted(true);

    setTimeout(()=> {
      setissubmitted(false);
    }, 5000)
  }

  return (
    <div>
      <footer>
        <div className="footer-backgroundcolor"></div>
        <address className='address'>
          OUR OFFICE
        </address>
        <div className="address-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.123474806453!2d76.62589047486851!3d30.771113774565766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ffabd5a885a7f%3A0x9073c149606f87af!2sAmayra%20Greens!5e0!3m2!1sen!2sin!4v1725877262794!5m2!1sen!2sin"
            width="200" height="200" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="footer-info">
          <div className='footer-us'>
            <h2>Information</h2>
            <h3><NavLink to='/aboutus' style={{ textDecoration: 'none' }}>About Us</NavLink></h3>
            <h3><NavLink to='/contactus' style={{ textDecoration: 'none' }}>Contact Us</NavLink></h3>
          </div>
          <div className="footer-categories">
            <h2>Categories</h2>
            <h3>Fruits</h3>
            <h3>Vegetables</h3>
            <h3>Dairy</h3>
            <h3>Snacks</h3>
          </div>
          <div className="footer-socialmedia">
            <h2>Social Media</h2>
            <h3> <i class="bi bi-instagram"></i> <a href={'http://www.instagram.com'} target='_blank' rel="noopener noreferrer">Instagram</a></h3>
            <h3> <i class="bi bi-linkedin"></i> <a href={'https://www.linkedin.com/'} target='_blank' rel="noopener noreferrer">LinkedIn</a></h3>
            <h3> <i class="bi bi-facebook"></i> <a href={'https://www.facebook.com/'} target='_blank' rel="noopener noreferrer">Facebook</a></h3>
          </div>
          <div className="footer-subscribe">
            <h2>Subscribe for discount updates</h2>
            <form action="#" onSubmit={handlefootersubmit}>
              <h3><input type="email" name='footer-username' placeholder='Email address'/></h3>
              <input type="submit" value={issubmitted ? 'Submitted' : 'Submit'} />
            </form>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer