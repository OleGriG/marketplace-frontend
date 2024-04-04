// HomePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseDevelopUrl } from './constants';
import Header from './Header';
import Footer from './Footer';
import './App.css';

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
  const ImageUrl = 'https://w.forfun.com/fetch/69/696f2098569b534e87eee3bfa07c4eab.jpeg';

  return (
    <div className="home-page">
      <Header toggleCategories={toggleCategories} showCategories={showCategories} categories={categories} />
      <div className="main-content">
        <div className="product-list">
          {products.map((product, index) => (
            <div key={product.id} className="product-item">
              <div className="product-image">
                <img src={ImageUrl} alt={product.name}/>
              </div>
              <div className="product-name">
                <p>{product.name}</p>
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
