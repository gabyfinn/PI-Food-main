import React from "react";
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import logo from '../../img/Logo2.png';

const NavBar = () => {
  const location = useLocation();
  console.log("Estoy parado en:");
  console.log(location.pathname);
  return (
    <div className="navBar">
      <Link to={'/'}>
        <img src={logo} alt='logo'></img>
      </Link>
      <Link className="link" to={'/'}>Home</Link>
      <Link className="link" to={'/recipe/create'}> Create Recipe</Link>

      <Link className="link back" to={'/recipes'}>Back</Link>
    </div>
  )
}


export default NavBar;