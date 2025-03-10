import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../Pages/Cart.css';
import Bin from '../assets/Bin.png';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, calculateSubtotal } = useContext(CartContext); // Get cart data and quantity functions

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h1>Your Cart</h1>
        <header className='cart-header'>
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
                  <p>{item.name}</p>
                  <p>&#8377;{item.price.toFixed(2)}</p> {/* Display price */}
                  <div className="cart-quantity-controls">
                    <button onClick={() => decreaseQuantity(item.name)}>-</button> {/* Decrease button */}
                    <p>{item.quantity}</p>
                    <button onClick={() => increaseQuantity(item.name)}>+</button> {/* Increase button */}
                  </div>
                  <p>&#8377;{subtotal.toFixed(2)}</p> {/* Display subtotal */}
                  <button onClick={() => removeFromCart(item.name)}>
                    <img src={Bin} alt="Delete Icon" className='cart-bin' />
                  </button> {/* Remove button */}
                </div>
              );
            })}
            <div className="cart-total">
              <h4>Total Subtotal: &#8377;{calculateSubtotal().toFixed(2)}</h4> {/* Display total subtotal */}
            </div>
            <button className="place-order-btn">Place Order</button> {/* Place Order Button */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
