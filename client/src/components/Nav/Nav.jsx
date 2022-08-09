import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "./Nav.css";
import { getAllRecipes } from '../../redux/actions';

const Nav = () => {
    const dispatch = useDispatch();

     const [search,setSearch] = useState({
      search:"",
    })
    const handleChange = (e) => setSearch({
      ...search,
      [e.target.name]: e.target.value,
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(search);
      dispatch(getAllRecipes(search.search));
      setSearch("");
    }

    return (
      <div>
        
        <input
          id='searchbar'
          type="text"
          name="search"
          value={search.search}
          onChange={handleChange}
          placeholder='Buscar receta...'
        />
        <button
          onClick={handleSubmit}> Buscar</button>
        <Link to={'/'}>Landing Page</Link>
        <Link to={'/recipe/create'}>Create Recipe</Link>
      </div>
    );
  }


export default Nav;