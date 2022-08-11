import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getAllDiets } from "../../redux/actions";
import { useForm } from "../hooks/useForm";

const initialForm = {};
const validationsForm = (form) => { }
const CreateRecipe = () => {
  const { form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit, } = useForm(initialForm, validationsForm);
  const dispatch = useDispatch();
  const dietsApi = useSelector((state) => state.diets);
  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    image: "",
    healthScore: 0,
    instructions: "",
    errors: {},
  });
  const [diets, setDietas] = useState([]);
  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);


  const handleChange = (e) => setRecipe(
    {
      ...recipe,
      [e.target.name]: e.target.value,
    })

  const handleCheckBox = (e) => {
    if (!e.target.checked) {
      setDietas(diets?.filter(dieta => dieta !== e.target.value))
    } else {
      setDietas(
        [...diets,
        e.target.value]
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(diets);
    dispatch(createRecipe({ ...recipe, diets }));
    handleValidation();
  }

  const handleValidation = () => {
    let fields = recipe;
    let errors = {};
    let formIsValid = true;

    //title

    if (!recipe.title) {
      formIsValid = false;
      errors["name"] = "No puede estar vacio";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Solo letras";
      }
    }

    setRecipe({
      ...recipe,
      errors: errors,
    })
    return formIsValid;
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
        <span>{recipe.errors['title']}</span>
        <br />
        <label>Summary:</label>
        <input
          type="text"
          name="summary"
          value={recipe.summary}
          onChange={handleChange}
        />
        <br />
        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={recipe.image}
          onChange={handleChange}
        />
        <br />
        <label>healthScore:</label>
        <input
          type="number"
          name="healthScore"
          value={recipe.healthScore}
          onChange={handleChange}
        />
        <br />
        <label>Instructions:</label>
        <input
          type="text"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        />
        <br />
        {dietsApi?.map((diet, index) =>
          <div key={index}>
            <input key={index} type="checkbox" id={`diet${index}`} name={diet.name} value={diet.id} onChange={handleCheckBox} />
            <label htmlFor={`diet${index}`}> {diet.name} </label>
          </div>

        )}
        <br />
        <button type="submit">Create</button>

      </form>
    </div>
  )
}

export default CreateRecipe;