import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe } from "../../redux/actions";



const RecipeDetail = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState({});
  const dispatch = useDispatch();

  let resultado = useSelector((state) => state.recipe);

  const actualizar = useCallback(() => {
    setRecipe(resultado);
  }, [resultado])

  React.useEffect(() => {
    dispatch(getRecipe(match.params.recipeId));
  }, [dispatch, match.params.recipeId]);

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
      Recipe Detail
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt="Imagen Receta" />
      <ul>

        {recipe.diets?.map((diet) =>

          <li key={diet}>{diet}</li>
        )}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />


      <p>healthScore: {recipe.healthScore}</p>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  )
}

export default RecipeDetail;