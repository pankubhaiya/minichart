import React, { useState, } from 'react';
import {  useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios'; // Import axios for making HTTP requests

const LoginPage = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password
      });
      
      if (response.status === 200) {
        // Extract token and role from response
        const { username, role } = response.data.data;
      
        // Save token and role in localStorage
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('role', role);
        console.log("Login successful!");
        console.log("Response data:", response.data,response.data.jwt);
        alert("Login successful!");
        navigate("/product")
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
