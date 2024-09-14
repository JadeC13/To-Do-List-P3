import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Login">Login</Link></li>
                <li>Sign Up</li>
                <li>About Us</li>
            </ul>
        </nav>
    )
}

export default Navigation;