import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import ContactUs from './Pages/ContactUs'
import Feedback from './Pages/Feedback'
import Profile from './Pages/Profile'
import AboutUs from './Pages/AboutUs'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Cart from './Pages/Cart'
import Fruits from './Pages/Products/Fruits'
import Vegetables from './Pages/Products/Vegetables'
import Dairy from './Pages/Products/Dairy'
import PlaceOrder from './Pages/PlaceOrder'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/categories' element={<Categories />}></Route>
      <Route path='/contactus' element={<ContactUs />}></Route>
      <Route path='/feedback' element={<Feedback />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/aboutus' element={<AboutUs />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/fruits' element={<Fruits />}></Route>
      <Route path='/vegetables' element={<Vegetables />}></Route>
      <Route path='/dairy' element={<Dairy />}></Route>
      <Route path='/placeorder' element={<PlaceOrder />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App