import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getRecipe, cleanDetail } from "../../redux/actions";
import Loading from "../Loading/Loading";
import './RecipeDetail.css';


const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/recipes'), [history]);

  let resultado = useSelector((state) => state.recipe);

  const actualizar = useCallback(() => {
    setRecipe(resultado);
  }, [resultado])

  React.useEffect(() => {
    dispatch(getRecipe(recipeId));

    return () => {
      console.log("Entre al useEffect")
      dispatch(cleanDetail());
    }

  }, [dispatch, recipeId]);

  useEffect(() => {
    setLoading(loading => !loading);
    if (Object.keys(resultado).length) {
      actualizar();
    }
  }, [resultado, actualizar])

  if (loading) {
    return <Loading />
  }
  if (recipe.error) {
    setTimeout(() => {
      console.log("Entre al fin");
      handleOnClick();
    }, 5000);

    console.log(recipe.error);
    return <div className="recipeDetail"> <h2> El ID ingresado no es valido </h2></div>
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


        <div className="detailInstructions">
          <p>{recipe.instructions}</p>
        </div>

      </div>
    </div>


  )
}

export default RecipeDetail;