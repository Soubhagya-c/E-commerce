import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/ProductCard.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/v1/products/${productId}`
        );
        setProduct(response.data);
        setSelectedImage(response.data.imageUrl);
      } catch (error) {
        toast.error("Failed to fetch product details. Please try again.");
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Handle back to search
  const handleBackToSearch = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <p>Product not found.</p>
        <button onClick={handleBackToSearch} className="back-button">
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <button onClick={handleBackToSearch} className="btn btn-back">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Search
      </button>

      <div className="product-details-container">
        <div className="product-images">
          <div className="main-image">
            <img src={selectedImage} alt={product.title} />
          </div>
          <div className="thumbnail-gallery">
            {/* {product.images.map((image, index) => ( */}
            <img
              key={product.id}
              src={product.imageUrl}
              alt={`${product.title} ${product.id + 1}`}
              className={product.imageUrl === selectedImage ? "active" : ""}
              onClick={() => setSelectedImage(product.imageUrl)}
            />
            {/* ))} */}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">₹{product.price}</p>
          <p className="product-discount">{product.discountPercentage}% off</p>
          <div className="product-rating">Rating: {product.rating} ★</div>
          <p className="product-brand">Brand: {product.brand}</p>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-stock">
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
