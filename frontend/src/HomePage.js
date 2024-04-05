// HomePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseDevelopUrl } from './constants';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import './Header.css';
import './Footer.css';
import cartIcon from './icons/cartIcon.png';


const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseDevelopUrl}/marketplace/category-list/`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseDevelopUrl}/marketplace/products/?on_main_page=true`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleAddToCart = (productId) => {
    console.log(`Product with ID ${productId} added to cart.`);
  };

  const ImageUrl = 'https://cdn1.ozone.ru/s3/multimedia-m/6667672558.jpg';

  return (
    <div className="home-page">
      <Header toggleCategories={toggleCategories} showCategories={showCategories} categories={categories} />
      <div className="main-content">
        <div className="product-list">
        {products.map((product, index) => (
        <div key={product.id} className="product-item">
            <div className="product-image">
            <img src={ImageUrl} alt={product.name} />
            </div>
            <div className="product-info">
            <img src={ImageUrl} alt={product.name} />
            <p>{product.name}</p>
            <div className="price-container">
                <p className="price">{500}</p>
                <span className="currency">₽</span>
            </div>
            <button className="add-to-cart-button" onClick={() => handleAddToCart(product.id)}>
            </button>
            </div>
            <div className="product-name">
            <p>{product.name}</p>
            </div>
            <div className="price-container">
                <p className="price">{500}</p>
                <span className="currency">₽</span>
            </div>
        </div>
        ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};



export default HomePage;
