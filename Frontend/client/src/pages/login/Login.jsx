import React, { useState, } from 'react';
import {  Navigate } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios'; // Import axios for making HTTP requests

const LoginPage = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password
      });
      
      if (response.status === 200) {
        // Extract token and role from response
        const { token, role } = response.data;
  
        // Save token and role in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
  
        // Optionally, you can redirect the user to another page upon successful login
        console.log("Login successful!");
        console.log("Response data:", response.data);
        alert("Login successful!");
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
