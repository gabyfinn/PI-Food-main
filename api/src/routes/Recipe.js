const fetch = require('node-fetch');


const { Router } = require('express');
const { Op, Recipe } = require('../db')
const router = Router();
const { API_KEY, } = process.env;
/* const {
  DB_USER, DB_PASSWORD, API_KEY, DB_HOST,
} = process.env; */
//const fetch = require ('fetch-node');



router.get('/', async (req, res) => {
  console.log(API_KEY);
  let data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=2&addRecipeInformation=true`)
  .then((response) => response.json())
  console.log(Array.isArray(data));
  console.log(data);
  console.log(typeof data);
  console.log(data.results.length);

  let db = data.results?.map(recipe => {
    return {
      id:recipe.id,
      title:recipe.title,
      summary:recipe.summary,
      healthScore:recipe.healthScore,
      instructions:recipe.instructions
    }
  })
  return res.json(db);
  let { name } = req.query;
  try {
    if (!name) {
      throw new Error('No ingreso el name');
    }
    let recipeList = await Recipe.findAll({
      where: {
        title: '%name%'
      }
    });
    if (!recipeList) {
      return res.send(`No existe ninguna receta que contenga la palabra ${name}`);
    } else {
      return res.json(recipeList);
    }
  } catch (error) {
    return res.send(error.message);
  }
});

router.get('/:id', async (req, res) => {

});

router.post('/', async (req, res) => {

});


module.exports = router;