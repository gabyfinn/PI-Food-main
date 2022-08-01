import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRecipe } from '../../redux/actions';


export class RecipeCard extends Component {
    render() {

        return (
            <div>
                RecipeCard
                <button onClick={() => this.props.deleteHouse(this.props.id)}>x</button>
                <Link>
                <h3>{this.props.title}</h3>
                </Link>
               {/*  key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          summary={recipe.summary}
          healthScore={recipe.healthScore}
          instructions={recipe.instructions} */}
                <p>summary</p>
            </div>
        );
    };
}
export const mapDispatchToProps = { deleteRecipe };

export default connect(null, mapDispatchToProps)(RecipeCard);