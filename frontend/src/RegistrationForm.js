// RegistrationForm.js
import React, { useState } from 'react';
import { baseDevelopUrl } from './constants'; 

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${baseDevelopUrl}/users/registration/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, first_name, last_name, password }),
        });
        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('accessToken', data.access);
            window.location.href = '/';
        } else {
            setError('Ошибка регистрации');
        }
        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Имя" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Фамилия" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Подтвердить</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default RegistrationForm;
