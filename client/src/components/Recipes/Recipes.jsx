import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllDiets, getAllRecipes, setCurrentPage, loadingAction ,searchRecipe, resetRecipe} from "../../redux/actions";
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

  /* 
    useEffect(() => {
      /* setIsLoading(isLoading => !isLoading); */
  /*setIsLoading(true);
  if (recipe[0]?.id) {
    update();
  }
  setIsLoading(false);
}, [recipe]) */

  /* if (recipe.error) {
    setTimeout(() => {
      console.log("Entre al fin");
     /*  handleOnClick(); */
    /*  dispatch(resetRecipe());
    }, 5000);
    /* dispatch(loadingAction(true)); */
   /*
    console.log(recipe.error);
    return <div className="recipeDetail"> <h2> El ID ingresado no es valido </h2></div>
  }else{
    
  } */
  // GET current recipes

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  /* console.log("Lo que tiene recipes es:");
  console.log(recipe); */
  /* debugger; */
  const currentRecipes = recipe.error? null:recipe?.slice(indexOfFirstRecipe, indexOfLastRecipe);

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

      {recipe.error && <h1>{recipe.error}</h1>}
      {console.log(showLoading)}
      {showLoading ? null : <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} currentPage={currentPage} />}
      <div className="recipes">
        {showLoading ? <Loading /> :
          <RecipeCard recipes={currentRecipes} />}

      </div>
      {showLoading ? null : <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipe.length} paginate={paginate} currentPage={currentPage} />}
    </div>
  );
};

export default Recipes;