import React from 'react';
import { useNavigate } from 'react-router-dom';




const ProfilePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    return (
        <div>
            <h1>Профиль</h1>
            <button onClick={handleLogout}>
                Выйти
            </button>
        </div>
    );
};

export default ProfilePage;