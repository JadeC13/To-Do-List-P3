import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to ="/Tasks">Tasks</Link></li>
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Signup">Sign Up</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;