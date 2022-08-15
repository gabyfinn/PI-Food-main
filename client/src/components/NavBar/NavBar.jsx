import React from "react";
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {

  return (
    <div className="navBar">
      <img src="img/logo.jpg" alt='narute'></img>
      <div>
        {/* <img src="https://play-lh.googleusercontent.com/nCVVCbeSI14qEvNnvvgkkbvfBJximn04qoPRw8GZjC7zeoKxOgEtjqsID_DDtNfkjyo" alt='narute' width="300" />
        <img src='img/casi.png' alt='narute'></img> */}
      </div>
       <Link to={'/'}>Home</Link>
      <Link to={'/recipe/create'}> Create Recipe</Link>

      <Link className="back" to={'/recipes'}>Back</Link>
    </div>
  )
}


export default NavBar;