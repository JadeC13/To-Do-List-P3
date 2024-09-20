import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({ firstName, lastName, email, password }); // Log form data before sending
    
        if (!firstName || !lastName || !email || !password) {
            alert("All fields are required");
            return;
        }
    
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}users/signup`, { firstName, lastName, email, password });
            alert('Signup successful');
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };    

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="First Name" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Last Name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit">Signup</button>
        </form>
    );
};    

export default Signup;
