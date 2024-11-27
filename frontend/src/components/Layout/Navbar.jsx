import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { GiFilmProjector } from 'react-icons/gi';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';  
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate(); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  // Toggle dark mode and store preference in localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', !isDarkMode); // Save user preference
  };

  // Check the saved dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h2>Movies Hub</h2>
        <GiFilmProjector style={{ fontSize: '30px', paddingLeft: '5px' }} />
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={30} color="#fff" /> : <FaBars size={30} color="#fff" />}
      </div>

      {/* Navbar Links (Mobile Version, toggled by hamburger) */}
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" className="navbar-link">Home</Link>

        {user ? (
          <>
            <Link to="/favorites" className="navbar-link">Favorites</Link>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
        
        {/* Dark Mode Toggle Button */}
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun size={25} color="#fff" /> : <FaMoon size={25} color="#fff" />}
        </button>
      </div>
    </nav>
  ); 
};

export default Navbar;
