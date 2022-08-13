import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE, DELETE_RECIPE, GET_ALL_DIETS, ORDER_ALL_RECIPES, SET_ERROR} from '../actions';


const initialState = {
  recipes: [],
  recipesWork: [],
  recipe: {},
  diets: [],
  error:{}
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
      case SET_ERROR:
        break;
  
    default: return { ...state };
  };
};


export default rootReducer;