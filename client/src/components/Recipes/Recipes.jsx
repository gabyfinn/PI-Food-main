import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions";
import RecipeCard from '../RecipeCard/RecipeCard';
import Pagination from "../Pagination/Pagination";

const Recipes = () => {
  /* export class Recipes extends Component {
  
    componentDidMount() {
      /* this.recipes 
      if(!this.recipes?.length){
        this.props.getAllRecipes();
        setLoading()
      }
    } */
  //render() {
  //const selectorState = useSelector((state) => state.recipes);

  //const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const dispatch = useDispatch();
  let recipes = useSelector((state) => state.recipes);
  console.log(recipes);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      dispatch(getAllRecipes());
      setLoading(false);
    }
    fetchRecipes();

  }, []);


  // GET current recipes
  console.log(recipes);
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