import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <NavLink to="/Home">Home</NavLink><p></p>
      <NavLink to="/About">About</NavLink><p></p>
      <NavLink to="/Contact">Contact</NavLink><p></p>
      <NavLink to="/web">Web</NavLink><p></p>
      
      {/* <ul>
        <li><NavLink to="/Home.js">Home</NavLink></li>
        <li><NavLink to="/About.js">About</NavLink></li>
        <li><NavLink to="/Contact.js">Contact</NavLink></li>
      </ul> */}
    </div>
  );
};

export default Header;