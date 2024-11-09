import React from 'react';
import Navbar from '../Components/Navbar';
import '../Pages/Home.css';
import MainImage from '../assets/Hotpot.png';
import { Link } from 'react-router-dom';
import Apple from '../assets/Apple.png'
import Butter from '../assets/Butter.png'
import Egg from '../assets/Egg.png'
import Icecream from '../assets/Icecream.png'
import Milk from '../assets/Milk.png'
import Oil from '../assets/Oil.png'
import Onion from '../assets/Onion.png'
import Potato from '../assets/Potato.png'
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="backgroundcolor"></div>
      <div className="backgroundcolor2"></div>
      <div className="container">
        <img className='mainimage' src={MainImage} alt="MainImage" />
        <h1>
          "Fresh Groceries, Delivered Fast –<span>Your Everyday Essentials Just a Click Away!"</span>
        </h1>
        <p className='description'>
        Grocer Store makes grocery shopping easy and hassle-free. Explore a wide range of fresh produce, 
        pantry staples, and household essentials – all at unbeatable prices. With a seamless shopping experience, 
        secure checkout, and doorstep delivery, we bring convenience to your kitchen. Shop smarter, live better!
        </p>
        <button className='ordernowbutton' type='button'>
          <Link to='/categories'>Order Now</Link>
        </button>
        <div className="banner">
          <div className="banner-content">
            <span>20% OFF + FREE Delivery for first-time users</span>
            <span>30% OFF on fresh fruits and veggies</span>
            <span>Up to 50% OFF on household essentials</span>
            <span>30% OFF on fresh fruits and veggies</span>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="featured">
          <h2>Featured for you</h2>
          <div className="featured-products">
            <div className="products">
              <div className="product-name">
                <h3>Apple</h3>
              </div>
              <div className="product-image">
                <img src={Apple} alt="Milk" />
              </div>
            </div>
            <div className="products">
              <div className="product-name">
                <h3>Butter</h3>
              </div>
              <div className="product-image">
                <img src={Butter} alt="" />
              </div>
            </div>
            <div className="products">
              <div className="product-name">
                <h3>Egg</h3>
              </div>
              <div className="product-image">
                <img src={Egg} alt="" />
              </div>
            </div>
            <div className="products">
              <div className="product-name">
                <h3>Icecream</h3>
              </div>
              <div className="product-image">
                <img src={Icecream} alt="" />
              </div>
            </div>
            <div className="products">
              <div className="product-name">
                <h3>Milk</h3>
              </div>
              <div className="product-image">
                <img src={Milk} alt="" />
              </div>
            </div>
            <div className="products">
              <div className="product-name">
                <h3>Oil</h3>
              </div>
              <div className="product-image">
                <img src={Oil} alt="" />
              </div>
            </div>
            <div className="products">
              <div className="product-name">
                <h3>Onion</h3>
              </div>
              <div className="product-image">
                <img src={Onion} alt="" />
              </div>
            </div>
            <div className="products">
              <div className="product-name">
                <h3>Potato</h3>
              </div>
              <div className="product-image">
                <img src={Potato} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
