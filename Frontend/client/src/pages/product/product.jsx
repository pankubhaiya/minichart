import React, { useState, useEffect } from 'react';
import './Product.css'; // Import CSS for styling
import {  useNavigate } from 'react-router-dom';
const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch JWT token from localStorage
        const token = localStorage.getItem('token');

        // Construct request headers with the JWT token
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in Authorization header
        };

        // Fetch product data from the backend
        const response = await fetch('http://localhost:8000/all', {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
          
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      {error && <p>Error: {error}</p>}
      {products.map(product => (
        <div key={product._id} className="product-item">
          <h3>{product.name}</h3>
          <img src={product.image} alt={product.name} />
          <p>Price: Rs{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;
