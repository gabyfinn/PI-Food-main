const fetch = require('node-fetch');
const { Router } = require('express');
const { Op, Recipe } = require('../db');
const e = require('express');
const router = Router();
const { API_KEY, } = process.env;
const API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`;
/* const {
  DB_USER, DB_PASSWORD, API_KEY, DB_HOST,
} = process.env; */
//const fetch = require ('fetch-node');

async function getAllRecipes() {
  let api = await fetch(API)
  .then(response => response.json());
  let bd = await Recipe.findAll();
  let con = api.results.concat(bd);
  let resultado = con?.map(recipe => {
    return {
      id: recipe.id,
      title: recipe.title,
    }
  });

  return resultado;
  
}

router.get('/', async (req, res, next) => {
  console.log("Entre al primer ID");
  let totalRecipes = await getAllRecipes();
  console.log(totalRecipes);

  let title = req.query.name;

  if(title){
    let result = totalRecipes?.filter(e => e.title.toLowerCase().includes(title.toLowerCase()));
    if (result.length) {
      return res.json(result);
    }
    return res.status(404).send(`No se encontro una receta que contenga ${title}`);
    
  }

  return res.json(totalRecipes);
  
});

router.get('/', async (req, res) => {
  console.log("Entre al segundo GET");
  /*  let data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`)
     .then((response) => response.json())
 
   let db = data.results?.map(recipe => {
     return {
       id: recipe.id,
       title: recipe.title,
       summary: recipe.summary,
       healthScore: recipe.healthScore,
       instructions: recipe.instructions
     }
   }) */
  //return res.json(db);
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
  console.log("Entre a la ruta /:id");
  let { id } = req.params;

  try {
    let recipe = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
      .then(response => response.json());
    let result = {
      id: recipe.id,
      title: recipe.title,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      instructions: recipe.instructions
    }
    res.json(result);
  } catch (error) {
    res.status(404).send(error.message);
  }



});

router.post('/', async (req, res) => {

});


module.exports = router;