import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe } from "../../redux/actions";



const RecipeDetail = ({match}) => {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getRecipe(match.params.recipeId));
    },[]);
    let recipe =useSelector((state) => state.recipe);
    return (
      <div>
        Recipe Detail
        <h1>{recipe.title}</h1>
       <div dangerouslySetInnerHTML={{ __html: recipe.summary }}/>
        
        
        <p>healthScore: {recipe.healthScore}</p>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}/>
      </div>
    )
}

export default RecipeDetail;