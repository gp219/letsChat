// letschat-frontend/src/components/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import AuthService from '../services/AuthService';
import styles from './Login.module.css'; // Import CSS Module


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);

    // Call login API using AuthService (explained later)
    try {
      const response = await AuthService.login(username, password);
      if (response) {
        // Login successful, navigate to desired route (e.g., chat)
        navigate('/master-layout');
        console.log("success" , username, password);
      } else {
        // Handle login failure (e.g., display error message)
        console.error('Login failed:');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.appTitle}>Let's Chat</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}> 
        <label htmlFor="username" className={styles.label}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}  
        />
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}  
        />
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
    
  );
};

export default Login;

