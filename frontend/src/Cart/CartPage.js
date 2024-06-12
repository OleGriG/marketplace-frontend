// CartPage.js

import React, { useState, useEffect } from 'react';
import { baseDevelopUrl } from '../constants';
import BackendImage from '../scripts'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import axios from 'axios';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseDevelopUrl}/marketplace/category-list/`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await axios.get(`${baseDevelopUrl}/marketplace/carts/get-cart/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
    fetchCategories();
  }, []);

  if (!cart) {
    return <div>Loading...</div>;
  }

  const handleSelectAll = (bb) => {
    setSelectedProducts(bb.products.map(product => product.id));
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleClearSelectedProducts = () => {
    setSelectedProducts([]);
  };

  const getTotalPrice = (bb) => {
    return bb.reduce((total, product) => {
      if (selectedProducts.includes(product.id)) {
        return total + product.price;
      }
      return total;
    }, 0);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleRemoveProducts = async (productIds) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(`${baseDevelopUrl}/marketplace/carts/remove-products/`, {
        products_ids: productIds
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const updatedCart = await axios.get(`${baseDevelopUrl}/marketplace/carts/get-cart/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setCart(updatedCart.data);
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error removing products:', error);
    }
  };

  return (
    <div className='nn'>
    <Header toggleCategories={toggleCategories} showCategories={showCategories} categories={categories} />
    <div className="cart-container">
        <div className="cart-page">
        <h1>Корзина</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => handleSelectAll(cart)}>Выбрать все</button>
            <button onClick={handleClearSelectedProducts}>Очистить выбор</button>
        </div>
        {cart.products.map((product) => (
            <div key={product.id} className="cart-item">
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleSelectProduct(product.id)}
            />
            <BackendImage src={product.main_photo} alt={product.name} className="cart-item-image" />
            <h1></h1>
            <div className="cart-item-details">
                <h2>{product.name}</h2>
                <p>Price: {product.price} ₽</p>
                <p>Company: {product.owner.company_name}</p>
                <button onClick={() => handleRemoveProducts([product.id])}>Удалить товар</button>
            </div>
            </div>
        ))}
        </div>
        <div className="total-section">
          <p>Общая сумма: {getTotalPrice(cart.products)} ₽</p>
          <p>Пункт выдачи: Какой-то пункт</p>
          <p>Количество выбранных товаров: {selectedProducts.length}</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button>Заказать</button>
            <button onClick={() => handleRemoveProducts(selectedProducts)}>Убрать выбранные товары</button>
          </div>
        </div>
    </div>
    <Footer />
    </div>
  );
};

export default CartPage;
