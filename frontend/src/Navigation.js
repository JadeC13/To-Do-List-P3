import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    const [userMessage, setUserMessage] = useState('');

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserMessage('Logout successful!');

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Tasks">Tasks</Link></li>
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Signup">Sign Up</Link></li>
                <li className="logout" onClick={handleLogout}>Logout</li>
            </ul>
            {userMessage && <div>{userMessage}</div>} {/* Conditionally render the message */}
        </nav>
    );
}

export default Navigation;