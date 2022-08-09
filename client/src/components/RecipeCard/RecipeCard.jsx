import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRecipe } from '../../redux/actions';
import "./RecipeCard.css";


export class RecipeCard extends Component {


    render() {
        if (this.props.loading) {
            return <h2>Loading ...</h2>
        }
        console.log(this.props.recipes);
        return (
            <>
                {this.props.recipes.map(recipe => (
                    <div className='card-container' key={recipe.id}>
                        
                        <Link to={`/recipes/${recipe.id}`}>
                            <h3>{recipe.title}</h3>
                        
                        <img src={recipe.image} alt="Imagen Receta" />
                        <ul>

                            {recipe.diets?.map((diet) =>

                                <li key={diet}>{diet}</li>
                            )}
                        </ul>
                        </Link>
                    </div>
                ))}

                {/* 
                RecipeCard
                <button onClick={() => this.props.deleteHouse(this.props.id)}>x</button>
                <Link to={`/recipes/${this.props.id}`}>
                    <h3>{this.props.title}</h3>
                </Link>
                <img src={this.props.image} alt="Imagen Receta" />
                <ul>

                    {this.props.diets?.map((diet) =>
                       
                       <li key={diet}>{diet}</li> 
                    )}
                </ul> */}
            </>
        );
    };
}
export const mapDispatchToProps = { deleteRecipe };

export default connect(null, mapDispatchToProps)(RecipeCard);