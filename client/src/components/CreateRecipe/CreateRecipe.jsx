import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getAllDiets } from "../../redux/actions";
import { useForm } from "../hooks/useForm";
import NavBar from "../NavBar/NavBar";
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
  let regexName = /^[A-Za-z\s]+$/;
  let regexComments = /^.{1,255}$/;

  if (!form.title.trim()) {
    errors.title = "El campo 'Title' es requerido";
  } else if (!regexName.test(form.title.trim())) {
    errors.title = "El campo 'Title' solo acepta letras y espacios en blanco";
  }

  if (!form.summary.trim()) {
    errors.summary = "El campo 'Summary' es requerido";
  }

  if (!form.image.trim()) {
    errors.image = "El campo 'Image' es requerido";
  }
  if (!form.healthScore.trim()) {
    errors.healthScore = "El campo 'healthScore' es requerido";
  } else if (parseInt(form.healthScore) < 0 || parseInt(form.healthScore) > 100) {
    errors.healthScore = "Tiene que ser un numero entre 0 y 100";
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

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  return (
    <div>

      <div className="createRecipe-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="labelInput">Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Title..."
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.title}
              required
            />
          </div>


          {errors.title && <p style={styles}>{errors.title}</p>}

          <div>
            <label className="labelInput">Summary:</label>
            <input
              type="text"
              name="summary"
              placeholder="Summary..."
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.summary}
              required
            />
          </div>

          {errors.summary && <p style={styles}>{errors.summary}</p>}

          <label className="labelInput">Image:</label>
          <input
            type="text"
            name="image"
            placeholder="Ingrese URL de la imagen"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.image}

          />

          {errors.image && <p style={styles}>{errors.image}</p>}
          <div>
            <label className="labelInput">HealthScore:</label>
            <input
              type="number"
              name="healthScore"
              placeholder="Ingrese un numero entre 0 y 100..."
              onBlur={handleBlur}
              value={form.healthScore}
              onChange={handleChange}
              required
            />
          </div>


          {errors.healthScore && <p style={styles}>{errors.healthScore}</p>}

          <label className="labelInput">Instructions:</label>
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

          <div className="checkBoxDiets">
            {dietsApi?.map((diet, index) =>
              <div key={index}>
                <input key={index} onBlur={handleBlur} type="checkbox" id={`diet${index}`} name="diets" value={diet.id} onChange={handleCheckBox} />
                <label htmlFor={`diet${index}`}> {diet.name} </label>
              </div>

            )}
          </div>

          {errors.diets && <p style={styles}>{errors.diets}</p>}
          <button type="submit" className="buttonCreate">Create</button>

        </form>
      </div>
    </div>

  )
}

export default CreateRecipe;