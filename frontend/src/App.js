// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
