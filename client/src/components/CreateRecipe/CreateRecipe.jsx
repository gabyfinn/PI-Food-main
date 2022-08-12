import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getAllDiets } from "../../redux/actions";
import { useForm } from "../hooks/useForm";
import './CreateRecipe.css';

const initialForm = {
  title: "",
  summary: "",
  image: "",
  healthScore: "",
  instructions: "",
  diets: [],
};

const validationsForm = (form) => {
  let errors = {};

  if (!form.title.trim()) {
    errors.title = "El campo 'Title' es requerido";
  }

  if (!form.summary.trim()) {
    errors.summary = "El campo 'Summary' es requerido";
  }

  if (!form.image.trim()) {
    errors.img = "El campo 'Img' es requerido";
  }
  if (!form.healthScore.trim()) {
    errors.healthScore = "El campo 'healthScore' es requerido";
  }
  if (!form.instructions.trim()) {
    errors.instructions = "El campo 'instructions' es requerido";
  }
  if (!form.diets.length) {
    errors.diets = "Tiene que elegir al menos una dieta";
  }


  return errors;
}

let styles = {
  fontWeight: 'bold',
  color: '#dc3545',
}

const CreateRecipe = () => {

  const { form,
    errors,
    loading,
    response,
    handleChange,
    handleCheckBox,
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
    diets: [],
    errors: {},
  });

  /* const handleCheckBox = (e) => {
    if (!e.target.checked) {
      setDietas(diets?.filter(dieta => dieta !== e.target.value))
    } else {
      setDietas(
        [...diets,
        e.target.value]
      )
    }
  } */

  const [diets, setDietas] = useState([]);

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);


  /* const handleChange = (e) => setRecipe(
    {
      ...recipe,
      [e.target.name]: e.target.value,
    }) */

  /* const handleCheckBox = (e) => {
    if (!e.target.checked) {
      setDietas(diets?.filter(dieta => dieta !== e.target.value))
    } else {
      setDietas(
        [...diets,
        e.target.value]
      )
    }
  } */

  /* const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(diets);
    dispatch(createRecipe({ ...recipe, diets }));
    handleValidation();
  }
 */

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
          placeholder="Title..."
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.title}
          required
        />
        {errors.title && <p style={styles}>{errors.title}</p>}
        <label>Summary:</label>
        <input
          type="text"
          name="summary"
          placeholder="Summary..."
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.summary}
          required
        />
        {errors.summary && <p style={styles}>{errors.summary}</p>}

        <label>Image:</label>
        <input
          type="text"
          name="image"
          placeholder="Ingrese URL de la imagen"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.image}

        />

        {errors.image && <p style={styles}>{errors.image}</p>}

        <label>healthScore:</label>
        <input
          type="number"
          name="healthScore"
          onBlur={handleBlur}
          value={form.healthScore}
          onChange={handleChange}
          required
        />

        {errors.healthScore && <p style={styles}>{errors.healthScore}</p>}

        <label>Instructions:</label>
        <textarea
          name="instructions"
          cols="50"
          rows="5"
          placeholder="Instructions..."
          onBlur={handleBlur}
          value={form.instructions}
          onChange={handleChange}
        >

        </textarea>

        {errors.instructions && <p style={styles}>{errors.instructions}</p>}
        {/* <input
          type="text"
          name="instructions"
          place
          value={recipe.instructions}
          onChange={handleChange}
        /> */}
        <br />

        {dietsApi?.map((diet, index) =>
          <div key={index}>
            <input key={index} onBlur={handleBlur} type="checkbox" id={`diet${index}`} name="diets" value={diet.name} onChange={handleCheckBox} />
            <label htmlFor={`diet${index}`}> {diet.name} </label>
          </div>

        )}
        {errors.diets && <p style={styles}>{errors.diets}</p>}
        <br />
        <button type="submit">Create</button>

      </form>
    </div>
  )
}

export default CreateRecipe;