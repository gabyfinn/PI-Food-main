import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Recipes from './components/Recipes/Recipes';
import RecipeDetail from './components/RecipesDetail/RecipeDetail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import LandingPage from './components/LandingPage/LandinPage';
import NavBar from './components/NavBar/NavBar';
import Page404 from './components/Page404/Page404';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route exact path={'/'} component={LandingPage} />
          <Route exact path={'/recipes'} component={Recipes} />
          <Route exact path={'/recipes/:recipeId'} >
            <NavBar />
            <RecipeDetail />
          </Route>
          <Route exact path={'/recipe/create'}>
            <NavBar />
            <CreateRecipe />
          </Route>
          <Route path={'*'} component={Page404} />
        </Switch>
      </BrowserRouter>


    </div>
  );
}

export default App;
