import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import './Categories.css';
import Fruitsvegetables from '../assets/Fruitsvegetables.png';
import Footer from '../Components/Footer';
import { NavLink } from 'react-router-dom';
import Fruitlists from '../Products/fruits.json';
import Vegetablelists from '../Products/vegetables.json';
import Dairylists from '../Products/dairy.json';
import { CartContext } from '../context/CartContext';

const Categories = () => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  // Check if a product is in the cart
  const getCartItem = (name) => {
    return cart.find(item => item.name === name);
  };

  return (
    <div>
      <Navbar />
      <div className="categories">
        <div className="categories-header">
          <img src={Fruitsvegetables} alt="Fruits and vegetables" className='categories-header-backgroundimg' />
          <h1>Fresh <span>Grocery</span> <br /> Shopping</h1>
        </div>
        <div className="categories-content">
          <div className="categories-featured">
            <h2>Fruits</h2>
            <NavLink to='/fruits' className='categories-seemore-vegetables' style={{ textDecoration: 'none' }}>See more...</NavLink>
            <div className="categories-featured-fruitsvegetables">
              {Fruitlists.map((Fruitlist) => {
                const cartItem = getCartItem(Fruitlist.name);
                return (
                  <div className='categories-featured-fruitsvegetables-list' key={Fruitlist.id}>
                    <img src={Fruitlist.img} alt={Fruitlist.name} />
                    <p>{Fruitlist.name}</p>
                    <p>{Fruitlist.kg}Kg</p>
                    <p>&#8377;{Fruitlist.price}</p>
                    <p>
                      {cartItem ? (
                        <div className="quantity-controls">
                          <button onClick={() => decreaseQuantity(Fruitlist.name)}>-</button>
                          <span>{cartItem.quantity}</span>
                          <button onClick={() => increaseQuantity(Fruitlist.name)}>+</button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart({ name: Fruitlist.name, price: Fruitlist.price })}>
                          Add to cart
                        </button>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            <h2>Vegetables</h2>
            <NavLink to='/vegetables' className='categories-seemore-vegetables' style={{ textDecoration: 'none' }}>See more...</NavLink>
            <div className="categories-featured-fruitsvegetables">
              {Vegetablelists.map((Vegetablelist) => {
                const cartItem = getCartItem(Vegetablelist.name);
                return (
                  <div className='categories-featured-fruitsvegetables-list' key={Vegetablelist.id}>
                    <img src={Vegetablelist.img} alt={Vegetablelist.name} />
                    <p>{Vegetablelist.name}</p>
                    <p>{Vegetablelist.kg}</p>
                    <p>&#8377;{Vegetablelist.price}</p>
                    <p>
                      {cartItem ? (
                        <div className="quantity-controls">
                          <button onClick={() => decreaseQuantity(Vegetablelist.name)}>-</button>
                          <span>{cartItem.quantity}</span>
                          <button onClick={() => increaseQuantity(Vegetablelist.name)}>+</button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart({ name: Vegetablelist.name, price: Vegetablelist.price })}>
                          Add to cart
                        </button>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
            <h2>Dairy</h2>
            <NavLink to='/dairy' className='categories-seemore-dairy' style={{ textDecoration: 'none' }}>See more...</NavLink>
            <div className="categories-featured-fruitsvegetables">
              {Dairylists.map((Dairylist) => {
                const cartItem = getCartItem(Dairylist.name);
                return (
                  <div className='categories-featured-fruitsvegetables-list' key={Dairylist.id}>
                    <img src={Dairylist.img} alt={Dairylist.name} />
                    <p>{Dairylist.name}</p>
                    <p>{Dairylist.kg}</p>
                    <p>&#8377;{Dairylist.price}</p>
                    <p>
                      {cartItem ? (
                        <div className="quantity-controls">
                          <button onClick={() => decreaseQuantity(Dairylist.name)}>-</button>
                          <span>{cartItem.quantity}</span>
                          <button onClick={() => increaseQuantity(Dairylist.name)}>+</button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart({ name: Dairylist.name, price: Dairylist.price })}>
                          Add to cart
                        </button>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
