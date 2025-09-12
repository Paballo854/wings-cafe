// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Don't render navbar if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Wings Cafe</h2>
      </div>
      
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/products" 
            className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
          >
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/sales" 
            className={`nav-link ${location.pathname === '/sales' ? 'active' : ''}`}
          >
            Sales
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/reporting" 
            className={`nav-link ${location.pathname === '/reporting' ? 'active' : ''}`}
          >
            Reporting
          </Link>
        </li>
      </ul>

      <div className="navbar-user">
        <span className="user-welcome">Welcome, {user?.name || 'User'}</span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;