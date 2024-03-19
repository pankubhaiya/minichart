import React, { useState } from 'react';
import './SignupPage.css';
import axios from 'axios'; // Import axios for making HTTP requests

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/signup', {
        username,
        email,
        password
      });
      console.log("Response data:", response);
      if(response.status==200){
        alert("Signup successful!")
        console.log("Signup successful!");
        console.log("Response data:", response.data);
      }else{
        alert(response.data)
      }
     
      // Optionally, you can redirect the user to another page upon successful signup
    } catch (error) {
      setError("Failed to sign up. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignupPage;
