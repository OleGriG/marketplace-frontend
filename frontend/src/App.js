// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './Registration/RegistrationPage';
import LoginPage from './Login/LoginPage';
import HomePage from './HomePage';
import CartPage from './Cart/CartPage';
import ProfilePage from './Profile/ProfilePage';
import { CategoryProvider } from './context'

const App = () => {
    return (
        <CategoryProvider>
            <Router>
                <div>
                    <Routes>
                        <Route path="/registration" element={<RegistrationPage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/" element={<HomePage/>} />
                    </Routes>
                </div>
            </Router>
        </CategoryProvider>
    );
};

export default App;
