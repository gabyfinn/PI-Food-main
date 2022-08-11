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
    console.log("entre al metodo actualizar");
    setRecipes(recipe);
  }, [recipe])

  useEffect(() => {
    /* if (recipe.length === 0) { */
    dispatch(getAllRecipes());
    dispatch(getAllDiets());
    console.log("Entre al use efect del getAllRecipes");

    /* } */

  }, [dispatch]);

  useEffect(() => {
    setLoading(loading => !loading);
    if (recipe[0]?.id) {
      update();
    }
  }, [recipe, update])

  // GET current recipes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  console.log(loading);
  console.log(recipe);
  console.log(recipes);
  console.log(currentRecipes);
  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  //Function to sort by title
  function sortByDiet(diet) {
    paginate(1);
    if (diet === 'all') return setRecipes(recipe);
    let aux = [...recipe];

    let aux2 = aux?.filter((e) => e.diets.includes(diet));
    console.log(aux2);
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
    console.log(aux);

    setRecipes(aux);
    console.log(recipes);
  }


  // Reenderizado
  return (
    <div>
      <h3>Recipes</h3>
      <Nav sortByTitle={sortByTitle} sortByDiet={sortByDiet} />
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