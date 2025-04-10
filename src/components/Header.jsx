import React from 'react';
import {
  GiShop,
  GiReceiveMoney,
  GiBlackKnightHelm,
  GiWallet,
} from 'react-icons/gi';
import { AiFillStar } from 'react-icons/ai';
import { RiDashboardFill } from 'react-icons/ri';
import { IoMdSwap } from 'react-icons/io';
import { GoVerified } from 'react-icons/go';
import { FaGamepad } from 'react-icons/fa';
import { AiFillBank } from 'react-icons/ai';
import './Header.css'; // We'll create this next

// Assuming logos are in the public folder
const logoWithText = '/logo-with-text.png';
const logoWithoutText = '/logo-without-text.png';

function Header({ children }) { // Accept children to place the ConnectButton
  const navLinks = [
    { href: "https://app.magiccraft.io/marketplace/explorer", icon: <GiShop />, text: "Marketplace" },
    { href: "https://lobby.magiccraft.io/?manageBalance=buyBnb", icon: <IoMdSwap />, text: "Buy $MCRT", target: "_blank" },
  ];

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-logo">
          <a href="/" rel="noopener noreferrer">
            {/* Basic responsive logo handling */}
            <img src={logoWithText} alt="MagicCraft Logo" className="logo-large" />
            <img src={logoWithoutText} alt="MagicCraft Logo" className="logo-small" />
          </a>
        </div>

        <nav className="header-nav">
          {navLinks.map((link) => (
            <a
              key={link.text}
              href={link.href}
              // Removed the className logic for 'active' for simplicity now
              className="header-menu-item"
              target={link.target || '_self'}
              rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
            >
              <div className="navbar-item">
                {link.icon}
                <h6>{link.text}</h6>
              </div>
            </a>
          ))}
        </nav>

        <div className="header-connect-wallet">
          {children} {/* Render the ConnectButton passed from App.jsx here */}
        </div>
      </div>
    </header>
  );
}

export default Header; 