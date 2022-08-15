import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./Nav.css";
import logo from '../../img/Logo.jpg';

const Nav = ({ searchRecipe, sortByTitle, sortByDiet }) => {
  const diets = useSelector((state) => state.diets);
  const [search, setSearch] = useState("")

  const handleChange = (e) => setSearch(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipe(search);
    setSearch("");
  }
  
  return (
    <div>

      <div className='navRecipes'>
        <div className='logo'>

          <img src={logo} alt='narute'></img>
        </div>

        <Link to={'/'}>Home</Link>
        <Link to={'/recipe/create'}> Create Recipe</Link>



        <div className='filters'>
          <label htmlFor='diets'>Diets Filters</label>
          <select name='diets' defaultValue={'all'} onChange={e => sortByDiet(e.target.value)}>
            <option value='all'>All</option>
            {diets?.map((diet) => <option key={diet.name} value={diet.name}> {diet.name} </option>)}

          </select>
        </div>

        <div className='filters'>
          <label htmlFor='healthScore'>HealthScore Order</label>
          <select name='healthScore' defaultValue={'all'} onChange={e => sortByTitle(e.target.value, e.target.name)}>
            <option value='all'>All</option>
            <option value='asc'>Asc</option>
            <option value='desc'>Desc</option>
          </select>
        </div>

        <div className='filters'>
          <label htmlFor='title'>Alphabetic Order</label>
          <select name='title' defaultValue={'all'} onChange={e => sortByTitle(e.target.value, e.target.name)}>
            <option value='all'>All</option>
            <option value='asc'>A-Z</option>
            <option value='desc'>Z-A</option>
          </select>
        </div>
        <div className='search'>
          <input
            id='searchbar'
            type="text"
            name="search"
            value={search}
            onChange={handleChange}
            placeholder='Buscar receta...'
          />
          <button
            onClick={handleSubmit}> Search</button>
        </div>

      </div>
    </div>

  );
}


export default Nav;