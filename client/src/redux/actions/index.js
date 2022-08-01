export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE = "GET_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

export const getAllRecipes = () => dispatch => {
  return fetch('http://localhost:3001/recipes')
    .then((response) => response.json())
    .then((response) => dispatch({
      type: GET_ALL_RECIPES,
      payload: response,
    }));
};

export const getRecipe = (id) => dispatch => {
  return fetch(`http://localhost:3001/recipes/${id}`)
    .then((response) => response.json())
    .then((response) => dispatch({
      type: GET_RECIPE,
      payload: response,
    }));
};

export const createRecipe = (recipe) => {
  return {
    type: CREATE_RECIPE,
    payload: recipe,
  };
};

export const deleteRecipe = (id) => {
  return {
    type: DELETE_RECIPE,
    payload: id,
  };
};


