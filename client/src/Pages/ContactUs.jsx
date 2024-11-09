import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import '../Pages/ContactUs.css'
import Phone from '../assets/Phone.png'
import Mail from '../assets/Mail.png'
import Location from '../assets/Location.png'

const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <div className="contactus-container">
      <div className="contactus-background"></div>
      <div className="contactus-heading">
        <h1>Contact US</h1>
        <h3>We are here to help you</h3>
      </div>
      <div className="contactus-info">
        <div className="phone">
          <img src={Phone} alt="Phone" />
          <h4>Phone No:</h4>
          <h4>+91 99999 99999</h4>
        </div>
        <div className="mail">
          <img src={Mail} alt="Mail" />
          <h4>Mail Id:</h4>
          <h4>grocerstore@gmail.com</h4>
        </div>
        <div className="location">
          <img src={Location} alt="Phone" />
          <h4>Location:</h4>
          <h4>Grocer's store Head Office</h4>
          <h4>Amayra Greens</h4>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default ContactUs