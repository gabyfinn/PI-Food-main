import React from "react";
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../img/Logo2.png';

const NavBar = () => {

  return (
    <div className="navBar">
      <Link to={'/'}>
        <img src={logo} alt='logo'></img>
      </Link>
      <Link className="link" to={'/'}>Home</Link>
      <Link className="link" to={'/recipe/create'}> Create Recipe</Link>

      <Link className="back" to={'/recipes'}>Back</Link>
    </div>
  )
}


export default NavBar;