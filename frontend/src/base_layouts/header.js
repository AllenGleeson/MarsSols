import React from 'react';
import { Navbar, NavItem, NavLink } from 'react-bootstrap';
import logo from '../assets/images/logo.webp';
import '../assets/css/nav.css';

const Header = ({ scrolled }) => {
  return (
    <header className={`fixed-top${scrolled ? ' scrolled' : ''}`}>
      <Navbar id="nav">
        <Navbar.Brand href={`${process.env.PUBLIC_URL}/`}>
          <img src={logo} alt="Logo" className="d-inline-block align-top"/>
        </Navbar.Brand>
        <NavItem>
          <NavLink href='#SolDays'>SOLS</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='#SolCharts'>CHARTS</NavLink>
        </NavItem>
      </Navbar>
    </header>
  );
};

export default Header;