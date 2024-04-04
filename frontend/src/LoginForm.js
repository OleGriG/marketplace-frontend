import React, { useState } from 'react';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8030/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        });
        
        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('accessToken', data.access);
            window.location.href = '/';
        } else {
            setError('Ошибка авторизации. Проверьте логин и пароль.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" placeholder="Email" value={login} onChange={(e) => setLogin(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginForm;
