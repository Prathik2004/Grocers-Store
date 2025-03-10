import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import '../Pages/PlaceOrder.css';

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
      await axios.post('http://localhost:8000/orders', orderData);
      alert("Order placed successfully!");
      navigate('/'); // Redirect to home or order confirmation page
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="placeorder-container">
        <h1>Confirm Your Order</h1>
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          {cart.map((item, index) => (
            <div key={index} className="order-item">
              <p>{item.name} (x{item.quantity})</p>
              <p>&#8377;{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <h3>Total: &#8377;{calculateSubtotal().toFixed(2)}</h3>
        </div>

        <div className="delivery-form">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />

          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />

          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

          <button className="confirm-order-btn" onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceOrder;
