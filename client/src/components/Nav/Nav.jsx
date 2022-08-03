import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "./Nav.css";
import { getAllRecipes } from '../../redux/actions';

class Nav extends Component {
  render() {
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
      dispatch(getAllRecipes(recipe));
    }

    return (
      <div>
        <input
          id='searchbar'
          type="text"
          name="search"
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

};


export default Nav;