// Header.js

import React, { useState } from 'react';
import logo from './logo.png';
import avatar from './user-avatar.png'; // Assuming you have an image for the user avatar
import './Header.css';

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleViewProfile = () => {
    // Implement logic to navigate to the user's profile
    console.log('View Profile clicked');
    // For example, you can use react-router-dom to navigate to the profile page
    // history.push('/profile');
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logout clicked');
    // For example, you can clear user authentication state and navigate to the login page
    // history.push('/login');
  };

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSearch = (query) => {
    // Implement search logic with the provided query
    console.log('Search:', query);
  };

  const handleViewCart = () => {
    // Implement logic to navigate to the shopping cart
    console.log('View Cart clicked');
    // For example, you can use react-router-dom to navigate to the cart page
    // history.push('/cart');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Walmart Logo" />
        </div>
        <div className="menu-icon" onClick={handleToggleMenu}>
          ☰
        </div>
        <div className={`navigation-menu ${menuVisible ? 'active' : ''}`}>
          <ul>
            <li onClick={handleToggleMenu}>Home</li>
            <li onClick={handleToggleMenu}>Products</li>
          </ul>
        </div>
        <div className="title">
          <h3>WalECart Online Shopping</h3>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
        </div>
        
        <div className="user-avatar" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img src={avatar} alt="User Avatar" className="avatar" />
          {dropdownVisible && (
            <div className="dropdown-content">
              <button onClick={handleViewProfile}>View Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
            
      </div>
    </header>
  );
}

export default Header;
