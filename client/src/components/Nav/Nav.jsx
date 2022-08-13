import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./Nav.css";
import { getAllRecipes } from '../../redux/actions';

const Nav = ({ searchRecipe, sortByTitle, sortByDiet }) => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  /* console.log("imprimiendo las dietas");
  console.log(diets); */
  const [search, setSearch] = useState("")

  const handleChange = (e) => setSearch(e.target.value)

  /*  const handleOrder = (e) => setOrder({
     ...order,
     [e.target.name]: e.target.value,
   }) */
  /* 
    function handleOrder(e) {
    
      console.log(e.target.value);
      sort(e.target.value);
      
  
    } */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    /* dispatch(getAllRecipes(search)); */
    searchRecipe(search);
    setSearch("");
  }

  return (
    <div id='top'>
      <Link to={'/'}>Home</Link>
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
      <Link to={'/'}>Landing Page</Link>
      <Link to={'/recipe/create'}> Create Recipe</Link>

      <label htmlFor='diets'>Diets Filter:</label>
      <select name='diets' defaultValue={'all'} onChange={e => sortByDiet(e.target.value)}>
        <option value='all'>All</option>
        {diets?.map((diet) => <option key={diet.name} value={diet.name}>{diet.name}</option> )}
        
      </select>

      <label htmlFor='healthScore'>HealthScore Order:</label>
      <select name='healthScore' defaultValue={'all'} onChange={e => sortByTitle(e.target.value, e.target.name)}>
        <option value='all'>All</option>
        <option value='asc'>Asc</option>
        <option value='desc'>Desc</option>
      </select>

      <label htmlFor='title'>Alphabetic Order:</label>
      <select name='title' defaultValue={'all'} onChange={e => sortByTitle(e.target.value, e.target.name)}>
        <option value='all'>All</option>
        <option value='asc'>A-Z</option>
        <option value='desc'>Z-A</option>
      </select>
    </div>
  );
}


export default Nav;