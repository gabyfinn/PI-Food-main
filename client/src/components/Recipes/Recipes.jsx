import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllDiets, getAllRecipes, setCurrentPage, loadingAction, searchRecipe, resetRecipe, setError } from "../../redux/actions";
import RecipeCard from '../RecipeCard/RecipeCard';
import Pagination from "../Pagination/Pagination";
import './Recipes.css';
import Nav from "../Nav/Nav";
import Loading from "../Loading/Loading";

const Recipes = () => {

  const [recipes, setRecipes] = useState([]);
  const [recipesPerPage] = useState(9);
  const history = useHistory();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipesWork);
  const currentPage = useSelector(state => state.currentPage);
  const showLoading = useSelector(state => state.showLoading);
  const error = useSelector(state => state.error)
  const handleOnClick = useCallback(() => history.push('/recipes'), [history]);

  /* const update = useCallback(() => {

    setRecipes(recipe);

  }, [recipe])
 */
  useEffect(() => {

    /* if (recipe[0]?.id) {
      update();
    } */
    if (recipe[0]?.id) setRecipes(recipe);

  }, [recipe])

  useEffect(() => {
    /*  if (recipe.length === 0) { */
    dispatch(loadingAction(true));
    dispatch(getAllRecipes());
    dispatch(getAllDiets());

    /*  } */

  }, [dispatch]);

  useEffect(() => {
    console.log("Entre al use efect del error");
    if (error) {
      setTimeout(() => {
        console.log("Entre al fin");

        dispatch(setError());
        setError(error)
        handleOnClick();
        
      }, 2000);
    }
  }, [error,dispatch,handleOnClick])

  /* 
    useEffect(() => {
      /* setIsLoading(isLoading => !isLoading); */
  /*setIsLoading(true);
  if (recipe[0]?.id) {
    update();
  }
  setIsLoading(false);
}, [recipe]) */



 /*  function ReenderError() {
      if(error){console.log(error)
      console.log("Estoy en el error");
      setTimeout(() => {
        console.log("Entre al fin");

        dispatch(setError());
        handleOnClick();

      }, 2000);

      return <div className="recipeDetail"> <h2>{error} </h2></div>
    }

  } */


  /* if (!(error === "")) {
    console.log("Estoy en el error");
    setTimeout(() => {
      console.log("Entre al fin" + (i++));

      dispatch(setError());
      handleOnClick(); */
  /*  dispatch(resetRecipe()); */
  /*  }, 5000); */
  /* dispatch(loadingAction(true)); */
  /* 
      return
    } */
  // GET current recipes

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  /* console.log("Lo que tiene recipes es:");
  console.log(recipe); */
  /* debugger; */
  const currentRecipes = recipe?.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));


  function search(title) {

    paginate(1);
    dispatch(loadingAction(true));
    dispatch(searchRecipe(title))


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
      <Nav searchRecipe={search} sortByTitle={sortByTitle} sortByDiet={sortByDiet} >
      </Nav>
      {error &&<div className="recipeDetail"> <h2>{error} </h2></div>}

      {error ? null : showLoading ? null : <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} currentPage={currentPage} />}
      <div className="recipes">
        {error ? null : showLoading ? <Loading /> :
          <RecipeCard recipes={currentRecipes} />}

      </div>
      {error ? null : showLoading ? null : <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipe.length} paginate={paginate} currentPage={currentPage} />}
    </div>
  );
};

export default Recipes;