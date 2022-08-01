import { Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import Recipes from './components/Recipes/Recipes';
import RecipeDetail from './components/RecipesDetail/RecipeDetail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>
     <Nav/>
     <Route exact path={'/'} component={Recipes}/>
     <Route exact path={'/recipes/:recipeId'} component={RecipeDetail}/>
     <Route exact path={'/recipe/create'} component={CreateRecipe}/>
     <Route/>
    </div>
  );
}

export default App;
