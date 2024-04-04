import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseDevelopUrl } from './constants';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseDevelopUrl}/marketplace/category-list/`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="home-page">
      <header>
        <h1>GoodBerries</h1>
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
    </div>
  );
};

export default HomePage;
