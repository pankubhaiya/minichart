import React, { useState, useEffect } from 'react';
import './Product.css'; // Import CSS for styling

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Data fetched:', data); // Log the fetched data
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Products:', products); // Log the products state

  return (
    <div className="product-container">
      {products.map(product => (
        <div key={product._id} className="product-item">
          <h3>{product.title}</h3>
          <p>Name: {product.name}</p>
          <p>Type: {product.type}</p>
          <p>Price: Rs{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;
