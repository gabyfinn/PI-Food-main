import { useState } from 'react';
import { useDispatch } from "react-redux";
import { createRecipe } from "../../redux/actions";

export const useForm = (initialForm, validateForm) => {

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({});
  const [confirm, setConfirm] = useState(false);

  /* const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null); */
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleCheckBox = (e) => {
    const { checked, value } = e.target;

    if (!checked) {
      let diets = form.diets?.filter(diet => diet !== value);

      setForm({ ...form, diets, })
    } else {

      let diets = [...form.diets, value]

      setForm(
        {
          ...form,
          diets,
        }
      )
    }
  }

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
      setConfirm(true);
      /* alert("Enviando el formulario"); */
      dispatch(createRecipe(form));
      setForm(initialForm);

      const diets = document.getElementsByName("dietsForm");
      for (const el of diets) {
        el.checked = false;
      }
      setTimeout(()=>{
        setConfirm(false);
      },5000);

    } else {
      return;
    }
  }

  return {
    form,
    errors,
    confirm,
    /* loading,
    response, */
    handleChange,
    handleCheckBox,
    handleBlur,
    handleSubmit,
  }

}