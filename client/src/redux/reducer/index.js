import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE, DELETE_RECIPE, GET_ALL_DIETS, ORDER_ALL_RECIPES } from '../actions';


const initialState = {
  recipes: [],
  recipesWork: [],
  recipe: {},
  diets: [],
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DIETS:
      return {
        ...state,
        diets: action.payload,
      }
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipesWork: action.payload,
      }
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      }
    case CREATE_RECIPE:
      return {
        ...state,
        recipesWork: [...new Set(state.recipesWork), action.payload],
      }
    case DELETE_RECIPE:
      break;
    /* case ORDER_ALL_RECIPES:
      
      console.log(order);
      console.log(action.payload)
      console.log(state.recipesWork);
      console.log([...state.recipesWork]);
      return{
        ...state,
        recipesWork:order,
      } */
  
    default: return { ...state };
  };
};


export default rootReducer;