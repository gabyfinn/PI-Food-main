import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "./Nav.css";
import { getAllRecipes } from '../../redux/actions';

const Nav = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState({
    search: "",
  })

  const [order, setOrder] = useState({
    order: '',
  })

  const handleChange = (e) => setSearch({
    ...search,
    [e.target.name]: e.target.value,
  })

 /*  const handleOrder = (e) => setOrder({
    ...order,
    [e.target.name]: e.target.value,
  }) */

  const handleOrder = (e) => {
    setOrder({...order,
      [e.target.name]: e.target.value,});
      dispatch(orderAllRecipes(order.order));

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    dispatch(getAllRecipes(search.search));
    setSearch("");
  }
  console.log(order);

  return (
    <div id='top'>
      <Link to={'/'}>Home</Link>
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
      <label htmlFor='order'>Alphabetic Order:</label>
      <select name='order' id='order' value={order.order} onChange={handleOrder}>
        <option value='asc' onClick={console.log('Elegi ordenamiento ascendente')}>A-Z</option>
        <option value='desc' onClick={console.log('Elegi ordenamiento descendente')}>Z-A</option>
      </select>
    </div>
  );
}


export default Nav;