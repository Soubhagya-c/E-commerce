import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import ProductDetails from './Components/ProductCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;