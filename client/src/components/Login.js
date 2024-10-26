import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Login = () => {
    const [email, setEmail] = useState(''); // Changed to email
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); // Changed to handle multiple errors
    const navigate = useNavigate(); // Use useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors before validation

        try {
            // Send a POST request to the backend API for login
            const response = await axios.post('/api/login', {
                email, // Use email state variable
                password,
            });

            // If login is successful, save the JWT token in localStorage
            localStorage.setItem('token', response.data.token);
            setErrors({}); // Reset errors

            // Redirect to the home page
            navigate('/home'); // Use navigate instead of history.push
        } catch (err) {
            // Handle login error
            setErrors({ email: 'Invalid username or password' }); // Adjust as needed
        }
    };

    return (
        <div className="flex flex-col items-center bg-blue-300 justify-center min-h-screen">
            <div className="bg-gray-200 pr-24 pl-24 pt-10 pb-10 rounded-3xl flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form className="flex flex-col w-full max-w-xs" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            className="p-2 border rounded border-slate-400 w-full"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            className="p-2 border rounded border-slate-400 w-full"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                 
            </div>
        </div>
    );
};

export default Login;
