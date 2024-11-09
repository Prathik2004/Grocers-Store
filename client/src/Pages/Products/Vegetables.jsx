import React, { useContext, useState } from 'react';
import Fruitsvegetables from 'D:/E commerce Wesbite/ecommerce1/ecommerce1/client/src/assets/Fruitsvegetables.png';
import Vegetablelists from 'D:/E commerce Wesbite/ecommerce1/ecommerce1/client/src/Products/vegetables.json';
import './Vegetables.css';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';
import Navbar from '../../Components/Navbar.jsx';

const Vegetables = () => {
    const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [sortOption, setSortOption] = useState('');

  // Function to handle sorting
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Function to get sorted fruits list based on sortOption
  const getSortedVegetables = () => {
    const sortedVegetables = [...Vegetablelists];
    if (sortOption === 'priceLowToHigh') {
      sortedVegetables.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
      sortedVegetables.sort((a, b) => b.price - a.price);
    }
    return sortedVegetables;
  };

  // Check if a product is in the cart
  const getCartItem = (name) => {
    return cart.find((item) => item.name === name);
  };

  const sortedVegetablelists = getSortedVegetables();

  return (
    <div className="vegetables">
      <Navbar />
      <div className="vegetables-header">
        <img src={Fruitsvegetables} alt="Fruits and vegetables" className="vegetables-header-backgroundimg" />
        <h1>Fresh <span>Grocery</span> <br /> Shopping</h1>
      </div>
      <div className="category-buttons">
        <NavLink to='/fruits' style={{ textDecoration: 'none' }}>Fruits</NavLink>
        <NavLink to='/vegetables' style={{ textDecoration: 'none' }}>Vegetables</NavLink>
        <NavLink to='/dairy' style={{ textDecoration: 'none' }}>Dairy</NavLink>
        <NavLink to='/biscuits' style={{ textDecoration: 'none' }}>Biscuits</NavLink>
        <NavLink to='/rice-flour' style={{ textDecoration: 'none' }}>Rice and Flour</NavLink>
      </div>
      <div className="vegetables-main">
        <div className="vegetables-filter-sort">
          <label htmlFor="sortOptions">Sort by:</label>
          <select id="sortOptions" value={sortOption} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="popularity">Popularity</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>

          <p>Filter by :</p>
        </div>
        <div className="vegetables-maincontent">
          <div className="vegetables-featured-fruitsvegetables">
            {sortedVegetablelists.map((Vegetablelist) => {
              const cartItem = getCartItem(Vegetablelist.name);
              return (
                <div className="vegetables-featured-fruitsvegetables-list" key={Vegetablelist.id}>
                  <img src={Vegetablelist.img} alt={Vegetablelist.name} />
                  <p>{Vegetablelist.name}</p>
                  <p>{Vegetablelist.kg}Kg</p>
                  <p>&#8377;{Vegetablelist.price}</p>
                  <p>
                    {cartItem ? (
                      <div className="vegetables-quantity-controls">
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
        </div>
      </div>
    </div>
  );
}

export default Vegetables