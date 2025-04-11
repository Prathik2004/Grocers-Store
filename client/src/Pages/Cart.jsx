import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../Pages/Cart.css';
import Bin from '../assets/Bin.png';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, calculateSubtotal } = useContext(CartContext); // Get cart data and quantity functions

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h1>Your Cart</h1>
        <header className="cart-header">
          <div className="cart-header-items">
            <h4>Cart items</h4>
            <h4>Price</h4>
            <h4>Quantity</h4>
            <h4>Sub Total</h4>
          </div>
        </header>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cart.map((item, index) => {
              const subtotal = item.price * item.quantity; // Calculate subtotal for each item
              return (
                <div key={index} className="cart-item">
                  <div className="cart-item-info">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <p>{item.name}</p>
                  </div>
                  <p>&#8377;{item.price.toFixed(2)}</p>
                  <div className="cart-quantity-controls">
                    <button onClick={() => decreaseQuantity(item.name)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => increaseQuantity(item.name)}>+</button>
                  </div>
                  <p>&#8377;{(item.price * item.quantity).toFixed(2)}</p>
                  <button className="cart-delete-btn" onClick={() => removeFromCart(item.name)} title="Remove item">
                    <img src={Bin} alt="Delete" />
                  </button>
                </div>

              );
            })}
            <div className="cart-total">
              <h4>Total Subtotal: &#8377;{calculateSubtotal().toFixed(2)}</h4> {/* Display total subtotal */}
            </div>
            <NavLink to="/placeorder" className="place-order-btn">
              Place Order
            </NavLink>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
