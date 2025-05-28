import React, { useContext, useState } from 'react';
import Fruitsvegetables from '../../../src/assets/fruitsvegetables.png';
import Fruitlists from '../../../src/Products/fruits.json';
import './Fruits.css';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';
import Navbar from '../../Components/Navbar.jsx';
const Fruits = () => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [sortOption, setSortOption] = useState('');

  // Function to handle sorting
  const handleSortChange = (event) => {x    
    setSortOption(event.target.value);
  };

  // Function to get sorted fruits list based on sortOption
  const getSortedFruits = () => {
    const sortedFruits = [...Fruitlists];
    if (sortOption === 'priceLowToHigh') {
      sortedFruits.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
      sortedFruits.sort((a, b) => b.price - a.price);
    }
    return sortedFruits;
  };

  // Check if a product is in the cart
  const getCartItem = (name) => {
    return cart.find((item) => item.name === name);
  };

  const sortedFruitlists = getSortedFruits();

  return (
    <div className="fruits">
      <Navbar />
      <div className="fruits-header">
        <img src={Fruitsvegetables} alt="Fruits and vegetables" className="fruits-header-backgroundimg" />
        <h1>Fresh <span>Grocery</span> <br /> Shopping</h1>
      </div>
      <div className="category-buttons">
        <NavLink to='/fruits' style={{ textDecoration: 'none' }}>Fruits</NavLink>
        <NavLink to='/vegetables' style={{ textDecoration: 'none' }}>Vegetables</NavLink>
        <NavLink to='/dairy' style={{ textDecoration: 'none' }}>Dairy</NavLink>
        <NavLink to='/biscuits' style={{ textDecoration: 'none' }}>Biscuits</NavLink>
        <NavLink to='/rice-flour' style={{ textDecoration: 'none' }}>Rice and Flour</NavLink>
      </div>
      <div className="fruits-main">
        <div className="fruits-filter-sort">
          <label htmlFor="sortOptions">Sort by:</label>
          <select id="sortOptions" value={sortOption} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="popularity">Popularity</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>

          <div className="filter">
            <p>Filter by :</p>
            
          </div>
        </div>
        <div className="fruits-maincontent">
          <div className="fruits-featured-fruitsvegetables">
            {sortedFruitlists.map((Fruitlist) => {
              const cartItem = getCartItem(Fruitlist.name);
              return (
                <div className="fruits-featured-fruitsvegetables-list" key={Fruitlist.id}>
                  <img src={Fruitlist.img} alt={Fruitlist.name} />
                  <p>{Fruitlist.name}</p>
                  <p>{Fruitlist.kg}Kg</p>
                  <p>&#8377;{Fruitlist.price}</p>
                  <p>
                    {cartItem ? (
                      <div className="fruits-quantity-controls">
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
        </div>
      </div>
    </div>
  );
};

export default Fruits;
