// Header.js

import React from 'react';
import './Header.css'

const Header = ({ toggleCategories, showCategories, categories }) => {
  return (
    <header className="header">
      <h1 className="logo">GoodBerries</h1>
      <button className="category-toggle" onClick={toggleCategories}>
        Категории
      </button>
      {showCategories && (
        <div className="category-list">
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
