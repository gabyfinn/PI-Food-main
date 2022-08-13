import { useState } from 'react';
import { useDispatch } from "react-redux";
import { createRecipe } from "../../redux/actions";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    })
  }

const handleCheckBox = (e) => {
  const { checked, value, name } = e.target;
  console.log(checked);
  if (!checked) {
    let diets = form.diets?.filter(diet => diet !== value);
    console.log(diets);
    setForm({ ...form, diets, })
  } else {
    console.log("Entre por el no");
    let diets = [...form.diets, value]
    console.log(diets);
    setForm(
      {
        ...form,
        diets,
      }
    )
  }
}
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

const handleBlur = (e) => {
  if (e.target.name === 'diets') {
    /* handleCheckBox(e); */
  } else {
    handleChange(e);
  }

  setErrors(validateForm(form));
}

const handleSubmit = (e) => {
  e.preventDefault();
  setErrors(validateForm(form));

  if (Object.keys(errors).length === 0) {

    alert("Enviando el formulario");
    dispatch(createRecipe(form));

  } else {
    return;
  }
}

return {
  form,
  errors,
  loading,
  response,
  handleChange,
  handleCheckBox,
  handleBlur,
  handleSubmit,
}

}