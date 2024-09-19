import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            const response = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('auth-token', response.data.token);
            setError('');
            navigate('/home'); // Redirect to Home page
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Login</button>
            </form>
        </div>
    );
};

export default Login;



// import React, { useState } from 'react';


// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         // Basic validation
//         if (!email || !password) {
//             setError('Please enter both email and password.');
//             return;
//         }

//         // Handle login logic here (e.g., API call)
//         console.log('Logging in with:', { email, password });

//         // Reset error on successful submission
//         setError('');
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form method="POST" action="/Login" onSubmit={handleSubmit}>
//                 {error && <p className="error-message">{error}</p>}
//                 <div className="form-group">
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;
