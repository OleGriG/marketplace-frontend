// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<h1>Marketplace</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
