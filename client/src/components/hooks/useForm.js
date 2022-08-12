import { useState } from 'react';

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    })
  }
  const handleCheckBox = (e) => {
    const { checked, value, name } = e.target;
    if (!checked) {
      
      setForm({...form,[name]:form[name]?.filter(diet => diet !== value)})
    } else {
      setForm(
       { ...form,
        [name]: [...form[name], value]}
      )
    }
  }

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  }

  const handleSubmit = (e) => { }

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