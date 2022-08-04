import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getAllDiets } from "../../redux/actions";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    instructions: "",
  });
  useEffect(() =>{
    dispatch(getAllDiets());
  },[dispatch]);
  const handleChange = (e) => setRecipe({
    ...recipe,
    [e.target.name]: e.target.value,
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecipe(recipe));
  }

  return (
    <div>
      Create Recipe
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleChange}
        />
        <label>Summary:</label>
        <input 
        type="text"
        name="summary" 
        value={recipe.summary}
        onChange={handleChange}
        />

        <label>healthScore:</label>
        <input 
        type="number"
        name="healthScore"
        value={recipe.healthScore}
        onChange={handleChange} 
        />

        <label>Instructions:</label>
        <input
        type="text"
        name="instructions"
        value={recipe.instructions}
        onChange={handleChange}
        />
        {diets?.map((diet,index) =>
        <div key={index}>
          <input key={index} type="checkbox" id={`diet${index}`} name={`diet${index}`} value={diet.title}/>
          <label htmlFor={`diet${index}`}> {diet.name} </label>
        </div>
          
        )}
        <button type="submit">Create</button>

      </form>
    </div>
  )
}

export default CreateRecipe;