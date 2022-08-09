import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE, DELETE_RECIPE, GET_ALL_DIETS, ORDER_ALL_RECIPES } from '../actions';


const initialState = {
  recipes: [],
  recipe: {},
  diets:[],
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DIETS:
      return {
        ...state,
        diets:action.payload,
      }
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      }
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      }
    case CREATE_RECIPE:
      console.log(action.payload);
      break;
    case DELETE_RECIPE:
      break;
      case ORDER_ALL_RECIPES:
    default: return { ...state };
  };
};


export default rootReducer;