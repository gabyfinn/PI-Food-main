import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipe } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import './RecipeDetail.css';

const RecipeDetail = () => {
  const {recipeId} =useParams();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState({});
  const dispatch = useDispatch();

  let resultado = useSelector((state) => state.recipe);

  const actualizar = useCallback(() => {
    setRecipe(resultado);
  }, [resultado])

  React.useEffect(() => {
    dispatch(getRecipe(recipeId));
  }, [dispatch, recipeId]);

  useEffect(() => {
    setLoading(loading => !loading);
    if (Object.keys(resultado).length) {
      actualizar();
    }
  }, [resultado, actualizar])

  if (loading) {
    return <h2>Loading ...</h2>
  }

  return (
    <div>
      <div className="recipeDetail">
        <div className="detailTitle">
          <h1>{recipe.title}</h1>
        </div>

        <div className="detailImage">
          <img src={recipe.image} alt="Imagen Receta" />
        </div>

        <div className="detailDiets">
          <p>Diets</p>
          <hr />
          <ul>

            {recipe.diets?.map((diet) =>

              <li key={diet}>{diet[0].toUpperCase() + diet.slice(1)}</li>
            )}
          </ul>

        </div>

        <div className="detailSummary" >
          <p>{recipe.summary}</p>
        </div>

        <div>
          <p>HealthScore: {recipe.healthScore}%</p>
        </div>


        <div>
          <p>{recipe.instructions}</p>
        </div>

      </div>
    </div>


  )
}

export default RecipeDetail;