export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE = "GET_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const ORDER_ALL_RECIPES = "ORDER_ALL_RECIPES";
export const SET_ERROR = "SET_ERROR";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const LOADING_ACTION = "LOADING_ACTION";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const RESET_RECIPE = "RESET_RECIPE";


//const URL_GETALL = 'http://localhost:3001/recipes';

export const getAllDiets = () => async (dispatch) => {
  return await fetch("http://localhost:3001/diets")
    .then((response) => response.json())
    .then((response) => dispatch({
      type: GET_ALL_DIETS,
      payload: response,
    }))
}

export const getAllRecipes = (title) => (dispatch) => {
  let url = 'http://localhost:3001/recipes';
  if (title) url = url + `?name=${title}`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {

      dispatch({
        type: GET_ALL_RECIPES,
        payload: response,
      })
      dispatch(loadingAction(false));
    })

};

export const getRecipe = (id) => dispatch => {
  /*   try { */
  return fetch(`http://localhost:3001/recipes/${id}`)
    .then((response) => response.json())
    .then((response) => dispatch({
      type: GET_RECIPE,
      payload: response,
    }), response => console.log(response))
    .catch((error) => {
      console.log("Existe un error");
      alert(error);
    })
  /* } catch (error) {
    console.log(error.message);
    alert(error);
  } */

};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
    payload: "",
  }
}

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  }
}

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

export const loadingAction = (status) => {
  return {
    type: LOADING_ACTION,
    payload: status,
  }
}

export const resetRecipe = () => {
  return {
    type: RESET_RECIPE,
    payload: "",
  }
}

export const setError = () => {
  return {
    type: SET_ERROR,
    payload:"",
  }
}

export const searchRecipe = (title) => (dispatch) => {
  let url = 'http://localhost:3001/recipes';
  if (title) url = url + `?name=${title}`;
  return fetch(url)
  .then((response) =>{
    if(response.ok){
      return response.json()
    }else{
      return response.text().then(text => {throw new Error(text)} )
    }
    
  })
  .then((response) => {
    dispatch({
      type: SEARCH_RECIPE,
      payload: response,
    })
    dispatch(loadingAction(false));
  })
  .catch(error => {
    console.log(error);
    dispatch({
      type: SET_ERROR,
      payload: error.message,
    })
    dispatch(loadingAction(false));
  })



  /* then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw response.json()
    }
  })
  .then((response) => {
    dispatch({
      type: SEARCH_RECIPE,
      payload: response,
    })
    dispatch(loadingAction(false));
  })
  .catch(error => {
    console.log("Entre al Error");
    console.log(error);
    dispatch({
      type: SET_ERROR,
      payload: error,
    })
    dispatch(loadingAction(false));
  })
*/




}



