import React, { useState, useEffect } from "react";
import{useNavigate} from "react-router-dom"
import axios from "axios";
import "./admin.css"; // Import your CSS file

const Admin = () => {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // State to store the product being edited

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/all");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:8000/add", {
        name,
        price,
        title,
        type,
        image,
      });
      fetchProducts(); // Fetch products again after adding
      // Clear input fields
      alert("Product added successfully!");
      setName("");
      setPrice("");
      setTitle("");
      setType("");
      setImage("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${id}`);
      fetchProducts(); // Fetch products again after deleting
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateProduct = (product) => {
    // Set the state to the product being edited
    setEditProduct(product);
    // Populate input fields with current values
    setName(product.name);
    setPrice(product.price);
    setTitle(product.title);
    setType(product.type);
    setImage(product.image);
  };

  const handleSaveUpdate = async () => {
    try {
      await axios.patch(`http://localhost:8000/update/${editProduct._id}`, {
        name,
        price,
        title,
        type,
        image,
      });
      fetchProducts(); // Fetch products again after updating
      // Clear input fields and reset editProduct state
      setName("");
      setPrice("");
      setTitle("");
      setType("");
      setImage("");
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="product-form">
        <h2>{editProduct ? "Edit Product" : "Add Product"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image Link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={editProduct ? handleSaveUpdate : handleAddProduct}>
          {editProduct ? "Save" : "Add Product"}
        </button>
      </div>
      <div className="product-list">
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <img src={product.image} alt="" />
              <p>Name: {product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Title: {product.title}</p>
              <p>Type: {product.type}</p>
              <button onClick={() => handleDeleteProduct(product._id)}>
                Delete
              </button>
              <button onClick={() => handleUpdateProduct(product)}>
                Update
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
