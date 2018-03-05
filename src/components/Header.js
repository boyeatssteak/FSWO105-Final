import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="container-fluid">
    <nav className="navbar fixed-top navbar-light bg-light">
      <div className="navbar-brand navTitle">Github Explorer</div>
      <ul className="nav justify-content-end nav-pills">
        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/search">Search</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/user">User</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;