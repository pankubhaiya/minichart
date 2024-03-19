import React, { useState, useEffect } from "react";
import "./Product.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch JWT token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          return navigate("/login");
        }
        // Construct request headers with the JWT token
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        };

        const response = await fetch("http://localhost:8000/all", {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setProducts(data.data);
        setFilteredProducts(data.data); // Initialize filtered products with all products
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchProducts();
  }, [navigate]);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Filter products based on search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="product-container">
            {error && <p>Error: {error}</p>}
            {filteredProducts.map((product) => (
              <div key={product._id} className="product-item">
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} />
                <p>Price: Rs{product.price}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
