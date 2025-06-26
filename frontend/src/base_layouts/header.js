import React from 'react';
import { Navbar, NavItem, NavLink } from 'react-bootstrap';
import logo from '../assets/images/logo.PNG';
import '../assets/css/nav.css';

const Header = () => {
  return (
    <header className='fixed-top'>
      <Navbar id="nav">
        <Navbar.Brand href="/">
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