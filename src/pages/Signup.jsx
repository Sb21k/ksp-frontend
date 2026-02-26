import { useState } from "react";
import {useNavigate} from "react-router-dom";

import api from "../api/axios"

const Signup =()=>{
    const [formDetails, setDetails] = useState({username:'', email:'',password:''});
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) =>{
        setDetails({...formDetails, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await api.post("/auth/signup",formDetails);
            alert('Signup Sucessful! You may login now');
            navigate('/login');
        }
        catch(err){
            setError(err.response?.data?.error || "Error in signup");
        }
    };
    return(
        <div className="page-wrapper">
            <h3>Create a new Account</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type ='text' name='username' placeholder="Enter Username"
                    value={formDetails.username} onChange={handleChange} required
                />
                <input type='email' name='email' placeholder="Enter your email"
                    value={formDetails.email} onChange={handleChange} required
                />
                <input type='password' name='password' placeholder="*********"
                    value={formDetails.password} onChange={handleChange} required
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default Signup;