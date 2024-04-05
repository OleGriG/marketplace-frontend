import React, { useState } from 'react';
import { baseDevelopUrl } from './constants';


const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${baseDevelopUrl}/users/login/`, {
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
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Подтвердить</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginForm;
