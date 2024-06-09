import React, { useState } from 'react';
import profileIcon from '../icons/profileIcon.png'; 
import cartIcon from '../icons/cartIcon.png';
import categoryIcon from '../icons/category.png';
import closeIcon from '../icons/close.png';
import './Header.css'

const Header = ({ categories }) => {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category) => {
    console.log(`Clicked on category: ${category.name}`);
  };

  const handleProfileClick = () => {
    console.log('Clicked on profile icon');
  };

  const handleCartClick = () => {
    console.log('Clicked on cart icon');
  };

  return (
    <header className="header">
      <div className="container-header">
        <div className="logo">
          <h1>GoodBerries</h1>
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
      {showCategories && (
        <div className="overlay" onClick={toggleCategories}></div>
      )}
    </header>
  );
};

export default Header;
