import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions";
import RecipeCard from '../RecipeCard/RecipeCard';
import Pagination from "../Pagination/Pagination";

const Recipes = () => {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);

  const dispatch = useDispatch();

  const recipe = useSelector((state) => state.recipes);

  const actualizar = useCallback(() => {
    console.log("entre al metodo actualizar");
    setRecipes(recipe);
  }, [recipe])

  useEffect(() => {
    console.log("Entre al use efect del getAllRecipes");
    dispatch(getAllRecipes());
  }, [dispatch]);

  useEffect(() => {
    console.log("Entre al use efect de loading");
    setLoading(true)
    if (recipe[0]?.id) {
      console.log("Entre al if recipe tiene algo");
      actualizar();
      setLoading(false);
    }
  }, [recipe, actualizar])

  // GET current recipes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  console.log(loading);
  console.log(recipe);
  console.log(recipes);
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <div>
      <h3>Recipes</h3>
      <RecipeCard
        recipes={currentRecipes}
        loading={loading}
      />
      <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} />
    </div>
  );
};

export default Recipes;