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
    setRecipes(recipe);
  }, [recipe])


  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  useEffect(() => {
    setLoading(loading => !loading)
    if (recipe[0]?.id) {
      console.log("entre a actualizar");
      actualizar();
    }
  }, [recipe, actualizar])


  // GET current recipes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);


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