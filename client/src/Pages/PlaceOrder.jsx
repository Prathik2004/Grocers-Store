import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import '../Pages/PlaceOrder.css';

const stripePromise = loadStripe("pk_test_51R3wwRKxWJHlkcPMlR9K6YlTUqIGOavLJ6HTmcvVxjK5Uaedh2QI51nHpdNqLQUWEqB9Xz6BQp4kWdv24l8mt9dt00C0eOtMBC");  // Replace with your Stripe public key

const PlaceOrder = () => {
  const { cart, calculateSubtotal } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = async () => {
    if (!formData.name || !formData.address || !formData.phone) {
        alert("Please fill all details!");
        return;
    }

    const orderData = {
        cart,
        subtotal: calculateSubtotal(),
        ...formData
    };

    try {
        console.log("Sending order data:", orderData); // Debugging request

        const response = await axios.post('http://localhost:8000/create-checkout-session', orderData);
        console.log("Stripe session response:", response.data); // Debugging response

        const { sessionId } = response.data;
        if (!sessionId) {
            throw new Error("Session ID not received!");
        }

        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId });

    } catch (error) {
        console.error("Error creating checkout session:", error.response ? error.response.data : error);
        alert("Payment failed. Please try again.");
    }
};

  return (
    <div>
      <Navbar />
      <div className="placeorder-body">
        <div className="placeorder-container">
          <h1>Confirm Your Order</h1>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            {cart.map((item, index) => (
              <div key={index} className="order-item">
                <div className="order-details">
                  <img src={item.img} alt={item.name} className="product-image" />
                  <p>{item.name} (x{item.kg} kg)</p>
                  <p>&#8377;{(item.price).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="delivery-form">
            <h2>Delivery Information</h2>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter your name' />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder='Enter your address' />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='Enter your contact number' />

            <button className="confirm-order-btn" onClick={handleConfirmOrder}>Confirm & Pay</button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PlaceOrder;
