import React from 'react'
import { Route,Routes } from "react-router-dom";
import SignupPage from './signup/Signup';
import Home from './Home';
import Product from './product/product';
import Admin from './Admin/admin';
import LoginPage from './login/Login';
const MainRouter = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/admin" element={<Admin />} />
         
        </Routes>

    </div>
  )
}

export default MainRouter
