import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Home = () => {
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleLogout = () => {
        // Clear the JWT token from localStorage
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/login'); // Use navigate instead of history.push
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Welcome to the Home Page</h2>
            <button onClick={handleLogout} style={{ padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}>
                Logout
            </button>
        </div>
    );
};

export default Home;
