// LoginPage.js
import React from 'react';
import LoginForm from './LoginForm';
import '../App.css';

const LoginPage = () => {
    return (
        <div className="container">
            <h1>Авторизация</h1>
            <LoginForm />
        </div>
    );
};

export default LoginPage;

