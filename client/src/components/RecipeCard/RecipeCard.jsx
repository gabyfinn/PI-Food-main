import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "./RecipeCard.css";


function RecipeCard({ recipes, loading }) {

    if (loading) {
        return <h2>Loading ...</h2>
    }
    console.log(recipes);
    return (
        <>
            {recipes.map(recipe => (
                <div className='card-container' key={recipe.id}>

                    <Link to={`/recipes/${recipe.id}`}>
                        <img src={recipe.image} alt="Imagen Receta" />
                        <h3>{recipe.title}</h3>
                        <ul>
                            {recipe.diets?.map((diet) =>

                                <li key={diet}>{`•${diet}`}</li>
                            )}
                        </ul>
                        <p>{recipe.healthScore}</p>
                    </Link>
                </div>
            ))}


        </>
    );
};

export default RecipeCard;