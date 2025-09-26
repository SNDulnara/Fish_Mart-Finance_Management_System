import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Company Name
        </Link>
        
        <div className="nav-menu">
          <div 
            className="nav-item dropdown"
            onMouseEnter={() => setIsFinanceOpen(true)}
            onMouseLeave={() => setIsFinanceOpen(false)}
          >
            <span className="nav-link">Finance</span>
            {isFinanceOpen && (
              <div className="dropdown-menu">
                <Link to="/finance/sofp" className="dropdown-item">
                  Statement of Financial Position
                </Link>
                <Link to="/profitandloss" className="dropdown-item">
                  Profit and Loss
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/salary" className="nav-item">
            <span className="nav-link">Salary</span>
          </Link>
          
          <Link to="/inventory" className="nav-item">
            <span className="nav-link">Inventory</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 