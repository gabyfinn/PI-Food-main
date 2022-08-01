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
        
      </div>
    )
}

export default RecipeDetail;