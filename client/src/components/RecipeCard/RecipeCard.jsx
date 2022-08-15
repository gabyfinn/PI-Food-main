import React from 'react';
import { Link } from 'react-router-dom';
import "./RecipeCard.css";


function RecipeCard({ recipes, loading }) {

    if (loading) {
        return <h2>Loading ...</h2>
    }
    return (
        <>
            {recipes.map(recipe => (
                <div className='card-container' key={recipe.id}>

                    <Link to={`/recipes/${recipe.id}`}>
                        <img src={recipe.image} alt="Imagen Receta" />
                        <div>
                            <h3>{recipe.title}</h3>
                        </div>

                        <div className='card-diets'>

                            {recipe.diets?.map((diet) =>

                                <li key={diet}>{`•${diet[0].toUpperCase() + diet.slice(1)}`}</li>
                            )}

                        </div>
                        <div className='card-healthScore'>
                            <p>{recipe.healthScore}%</p>
                        </div>


                    </Link>
                </div>
            ))}


        </>
    );
};

export default RecipeCard;