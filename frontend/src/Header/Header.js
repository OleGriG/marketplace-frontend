import React, { useState } from 'react';
import { useCategory } from '../context';
import { baseDevelopUrl } from '../constants';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import profileIcon from '../icons/profileIcon2.svg'; 
import cartIcon from '../icons/cartIcon2.svg';
import categoryIcon from '../icons/category2.svg';
import closeIcon from '../icons/close.png';
import './Header.css'

const Header = ({ categories }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategoryMessage, setSelectedCategoryMessage] = useState('');
  const { setSelectedCategory } = useCategory();
  const navigate = useNavigate();

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
    setSelectedCategoryMessage(`Товары из категории ${category.name}`);
    navigate('/');
  };

  const handleResetCategory = (e) => {
    setSelectedCategory(null);
    setSelectedCategoryMessage(``);
  };

  const handleProfileClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleCartClick = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.get(`${baseDevelopUrl}/marketplace/carts/get-cart/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  return (
    <header className="header">
      <div className="container-header">
        <div className="logo">
          <h1><Link to="/" onClick={handleResetCategory}>GoodBerries</Link></h1>
        </div>
        <div className="nav">
          <button className={`category-toggle ${showCategories ? 'close' : ''}`} onClick={toggleCategories}>
            {showCategories ? <img src={closeIcon} alt="Закрытие" className="close-icon" /> : <img src={categoryIcon} alt="Категории" className="category-icon" />}
          </button>
          <div className={`category-list ${showCategories ? 'show' : ''}`}>
            <ul>
              {categories.map((category) => (
                <li key={category.id} onClick={() => handleCategoryClick(category)}>
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <input type="text" placeholder="Поиск" className="search-input" />
          <button className="profile-button" onClick={handleProfileClick}>
            <img src={profileIcon} alt="Профиль" className="profile-icon" />
          </button>
          <button className="cart-button" onClick={handleCartClick}>
            <img src={cartIcon} alt="Корзина" className="cart-icon" />
          </button>
        </div>
      </div>
      {selectedCategoryMessage && (
        <div className="selected-category-message">
          {selectedCategoryMessage}
        </div>
      )}
      {showCategories && (
        <div className="overlay" onClick={toggleCategories}></div>
      )}
    </header>
  );
};

export default Header;
