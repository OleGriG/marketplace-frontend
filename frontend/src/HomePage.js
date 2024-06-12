// HomePage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { baseDevelopUrl } from './constants';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useCategory } from './context'
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cartIcon from './icons/cartIcon.png';


const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [slider, setSlider] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const { selectedCategory } = useCategory();

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchSlider();
  }, 
  []);

  useEffect(() => {
    if (selectedCategory) {
      loadProductsByCategory(selectedCategory);
    } else {
      fetchProducts();
    }
  }, [selectedCategory]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseDevelopUrl}/marketplace/category-list/`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const loadProductsByCategory = async (selectedCategory) => {
    try {
      const response = await axios.get(`${baseDevelopUrl}/marketplace/categories/${selectedCategory.id}/`);
      setProducts(response.data['products']);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseDevelopUrl}/marketplace/products/?on_main_page=true`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchSlider = async () => {
    try {
      const response = await axios.get(`${baseDevelopUrl}/marketplace/slider/`);
      setSlider(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleAddToCart = async (productId) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        navigate('/login');
    };

    try {
      const response = await fetch(`${baseDevelopUrl}/marketplace/carts/add-to-cart/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ product_id: productId }),
      });

      if (response.ok) {
          const data = await response.json();
          toast.success('Товар успешно добавлен в корзину!');
      } else {
          const errorData = await response.json();
          toast.success('Произошла ошибка при попытке добавить товар в корзину');
      }
  } catch (error) {
      console.error('Error adding product to cart:', error);
  }
  };

  return (
    <div className="home-page">
      <Header toggleCategories={toggleCategories} showCategories={showCategories} categories={categories} />
      <div className="slider-wrapper">
        <Slider {...sliderSettings}>
          {slider.map((slide, index) => (
            <div key={index} className="slider-item">
              <img src={slide.photo} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="main-content">
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-image">
                <img src={product.main_photo} alt={product.name} />
              </div>
              <div className="product-info">
                <p>{product.name}</p>
                <div className="price-container">
                  <p className="price">{product.price}</p>
                  <span className="currency">₽</span>
                </div>
              </div>
              <div className="product-name">
                <p>{product.name}</p>
              </div>
              <div className="price-container">
                <p className="price">{product.price}</p>
                <span className="currency">₽</span>
              </div>
              <div className='company-container'>
                  <p className="company-name">{product.owner.company_name}</p>
              </div>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(product.id)}>
              </button>
              </div>
          ))}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};



export default HomePage;
