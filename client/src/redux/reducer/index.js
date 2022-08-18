import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE, /* DELETE_RECIPE, */ GET_ALL_DIETS, CLEAN_DETAIL, SET_CURRENT_PAGE, LOADING_ACTION, SEARCH_RECIPE, RESET_RECIPE} from '../actions';


const initialState = {
  recipes: [],
  recipesWork: [],
  recipe: {},
  diets: [],
  error: {},
  currentPage: 1,
  showLoading: false,
  searchRecipe:[],
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
    case CLEAN_DETAIL:
      return {
        ...state,
        recipe: {}
      }
    case CREATE_RECIPE:
      return {
        ...state,
        recipesWork: [...new Set(state.recipesWork), action.payload],
      }
    /* case DELETE_RECIPE:
      break; */
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }

    case LOADING_ACTION:
      return {
        ...state,
        showLoading: action.payload,
      }

      case SEARCH_RECIPE:
        return {
          ...state,
          recipesWork:action.payload,
         /*  searchRecipe:action.payload, */
        }
        case RESET_RECIPE:
          return{
            ...state,
            recipesWork:state.recipes,
          }

    default: return { ...state };
  };
};


export default rootReducer;