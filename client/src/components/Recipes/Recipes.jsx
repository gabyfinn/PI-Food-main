import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllRecipes } from "../../redux/actions";
import RecipeCard from '../RecipeCard/RecipeCard';

export class Recipes extends Component {

  componentDidMount() {
    /* this.recipes */
    if(!this.recipes?.length){
      this.props.getAllRecipes();
    }
    
  }

  render() {
    return (
      <div>
        <h3>Recipes</h3>

        {this.props.recipes?.map((recipe) =>
        <RecipeCard 
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          summary={recipe.summary}
          healthScore={recipe.healthScore}
          instructions={recipe.instructions}

        />
        
        )}
      </div>
    );
  };
}

export const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  }
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getAllRecipes: () => dispatch(getAllRecipes()),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);