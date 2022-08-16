export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE = "GET_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const ORDER_ALL_RECIPES = "ORDER_ALL_RECIPES";
export const SET_ERROR = "SET_ERROR";

//const URL_GETALL = 'http://localhost:3001/recipes';

export const getAllDiets = () => async (dispatch) => {
  return await fetch("http://localhost:3001/diets")
    .then((response) => response.json())
    .then((response) => dispatch({
      type: GET_ALL_DIETS,
      payload: response,
    }))
}
export const getAllRecipes = (title) => async (dispatch) => {
  let url = 'http://localhost:3001/recipes';
  if (title) url = url + `?name=${title}`;
  return await fetch(url)
    .then((response) => response.json())
    .then((response) => dispatch({
      type: GET_ALL_RECIPES,
      payload: response,
    }))



};

export const getRecipe = (id) => dispatch => {
/*   try { */
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((response) => dispatch({
        type: GET_RECIPE,
        payload: response,
      }))
      .catch((error) => {
        console.log("Existe un error");
        alert(error);
      })
  /* } catch (error) {
    console.log(error.message);
    alert(error);
  } */

};

export const createRecipe = (recipe) => dispatch => {
  console.log(recipe);
  let prueba = JSON.stringify(recipe);
  console.log(prueba);
  return fetch('http://localhost:3001/recipes', {
    method: 'POST',
    body: prueba,
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((response) => response.json())
    .then((response) => dispatch({
      type: CREATE_RECIPE,
      payload: response,
    }))
    .catch(err => {
      console.error('Error: ', err);
    })

}

/* export const deleteRecipe = (id) => {
  return {
    type: DELETE_RECIPE,
    payload: id,
  };
}; */

export const orderAllRecipes = (order) => {
  return {
    type: ORDER_ALL_RECIPES,
    payload: order,
  }
}


