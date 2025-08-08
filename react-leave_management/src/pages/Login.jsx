import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { fetchUser, login } from '../services/authService';
import { ToastContainer, toast } from "react-toastify";



const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);

      await fetchUser();

      // Optionally redirect or update UI
      
    //   window.location.href = '/dashboard'; // or use React Router
    toast.success('Logged in successfully!');
    
    // navigate('/');
    setTimeout(() => {
        navigate('/');
      }, 1000); // waiting 1 sec for tost msg



    } catch (err) {
      setError('Invalid credentials');
    }
  };
  return (
    <div className="container mt-5" >
      <ToastContainer />
      <h2> Welcome to Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
