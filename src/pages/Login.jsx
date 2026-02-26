import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', formData);

            localStorage.setItem('token', response.data.token);

            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            alert('Logged in successfully!');
            navigate('/dashboard'); // redirect to dashboard
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials');
        }
    };

    return (
        <div className="page-wrapper">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="email" name="email" placeholder="Email" 
                    value={formData.email} onChange={handleChange} required 
                />
                <input 
                    type="password" name="password" placeholder="Password" 
                    value={formData.password} onChange={handleChange} required 
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;