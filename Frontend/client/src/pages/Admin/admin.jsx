import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css'; // Import your CSS file

const Admin = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/all');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:8000/add', { name, price, title, type });
      fetchProducts(); // Fetch products again after adding
      // Clear input fields
      alert("product is add")
      setName('');
      setPrice('');
      setTitle('');
      setType('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${id}`);
      fetchProducts(); // Fetch products again after deleting
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = async (id, newData) => {
    try {
      await axios.patch(`http://localhost:8000/update/${id}`, newData);
      fetchProducts(); // Fetch products again after updating
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="product-form">
        <h2>Add Product</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="product-list">
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <span>{product.name} - ${product.price}</span>
              <span>{product.title} - ${product.type}</span>
              
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              <button onClick={() => handleUpdateProduct(product._id, { name: 'Updated Product' })}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
