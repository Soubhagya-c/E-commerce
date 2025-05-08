import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchProduct = useCallback(async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/${id}`);
        setProduct(res.data);
      } catch (error) {
        toast.error('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    }, [id]);
  
    useEffect(() => {
      fetchProduct();
    }, [fetchProduct]);
  
    if (loading) return <div className="text-center">Loading...</div>;
    if (!product) return <div className="text-center">Product not found.</div>;
  
    return (
      <div className="product-details">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => e.target.style.display = 'none'}
        />
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-lg mb-2">${product.price}</p>
        <p className="mb-2">{product.description}</p>
        <p className="text-sm text-gray-600 mb-2">Brand: N/A</p>
        <p className="text-sm text-gray-600 mb-4">Category: {product.category}</p>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-4 py-2 rounded">
          Back to Search
        </button>
      </div>
    );
  }

export default ProductDetails;