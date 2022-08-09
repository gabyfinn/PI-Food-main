import { Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import Recipes from './components/Recipes/Recipes';
import RecipeDetail from './components/RecipesDetail/RecipeDetail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import LandingPage from './components/LandingPage/LandinPage';
function App() {
  return (
    <div className="App">
      {/* <h1>Henry Food</h1> */}
      <Route exact path={'/'} component={LandingPage} />
      <Route exact path={'/recipes'} component={Nav} />
      <Route exact path={'/recipes'} component={Recipes} />
      <Route exact path={'/recipes/:recipeId'} component={RecipeDetail} />
      <Route exact path={'/recipe/create'} component={CreateRecipe} />
      <Route />
    </div>
  );
}

export default App;
