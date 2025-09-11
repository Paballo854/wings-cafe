// frontend/src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple validation
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    const result = await login(credentials);
    
    if (result.success) {
      navigate('/'); // Redirect to dashboard on success
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  // Simple demo login - bypass the form
  const handleDemoLogin = () => {
    setLoading(true);
    login({ email: 'demo@wingscafe.com', password: 'demo123' })
      .then(() => navigate('/'))
      .catch(() => setError('Demo login failed'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Wings Cafe Inventory</h2>
          <p>Demo Login - Use any credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Enter any email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter any password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="login-btn"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-section">
          <button 
            onClick={handleDemoLogin}
            disabled={loading}
            className="demo-login-btn"
          >
            {loading ? 'Loading...' : 'Quick Demo Login'}
          </button>
          
          <div className="demo-info">
            <p>You can use any email and password combination</p>
            <p>Or just click "Quick Demo Login"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;