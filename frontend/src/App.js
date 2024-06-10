// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './Registration/RegistrationPage';
import LoginPage from './Login/LoginPage';
import HomePage from './HomePage';
import CartPage from './Cart/CartPage';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/" element={<HomePage/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
