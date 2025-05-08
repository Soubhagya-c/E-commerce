import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS//LandingPage.css";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch products based on search term
  const fetchProducts = async (term = "") => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/v1/products?query=${searchTerm}`);
      console.log(searchTerm);
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products. Please try again.");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="landing-page">
      <h1>Product Search</h1>
      <header className="search-header">
        <form onSubmit={handleSearchSubmit} className="search-container">
          <div className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </form>
      </header>

      <main className="product-grid-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.title} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-brand">Brand: {product.brand}</p>
                  <p className="product-category">
                    Category: {product.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No products found. Try a different search term.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
