import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, getAllRecipes } from "../../redux/actions";
import RecipeCard from '../RecipeCard/RecipeCard';
import Pagination from "../Pagination/Pagination";
import './Recipes.css';
import Nav from "../Nav/Nav";

const Recipes = () => {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);

  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes);

  const update = useCallback(() => {
    
    setRecipes(recipe);
  }, [recipe])

  useEffect(() => {
    /* if (recipe.length === 0) { */
    dispatch(getAllRecipes());
    dispatch(getAllDiets());
    

    /* } */

  }, [dispatch]);

  useEffect(() => {
    /* setLoading(loading => !loading); */
    setLoading(true);
    if (recipe[0]?.id) {
      update();
    }
    setLoading(false);
  }, [recipe, update])

  // GET current recipes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  function searchRecipe(title) {

    paginate(1);

    dispatch(getAllRecipes(title));

  }

  //Function to sort by diet
  function sortByDiet(diet) {
    paginate(1);
    if (diet === 'all') return setRecipes(recipe);
    let aux = [...recipe];

    let aux2 = aux?.filter((e) => e.diets.includes(diet));

    setRecipes(aux2)

  }


  function sortByTitle(order, key) {

    paginate(1);
    if (order === 'all') return setRecipes(recipe);
    let aux = [...recipe];
    aux.sort((a, b) => {
      if (typeof (a[key]) === 'number' ? a[key] < b[key] : a[key].toLowerCase() < b[key].toLowerCase()) {
        return order === 'desc' ? 1 : -1;
      }
      if (typeof (a[key]) === 'number' ? a[key] > b[key] : a[key].toLowerCase() > b[key].toLowerCase()) {
        return order === 'desc' ? -1 : 1;
      }
      return 0;
    })
    

    setRecipes(aux);
    
  }


  // Reenderizado
  return (
    <div>
      <Nav searchRecipe= {searchRecipe} sortByTitle={sortByTitle} sortByDiet={sortByDiet} >
        
      </Nav>
      <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} currentPage={currentPage} />

      <div className="recipes">
        <RecipeCard
          recipes={currentRecipes}
          loading={loading}
        />
      </div>
      {/* <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipe.length} paginate={paginate} currentPage={currentPage} /> */}
    </div>
  );
};

export default Recipes;