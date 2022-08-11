const fetch = require('node-fetch');
const { Router } = require('express');
const { Op, Recipe, Diet } = require('../db');
const e = require('express');
const sequelize = require('sequelize');
const { raw } = require('body-parser');
const router = Router();
const { API_KEY, } = process.env;
const API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`;
/* const {
  DB_USER, DB_PASSWORD, API_KEY, DB_HOST,
} = process.env; */
//const fetch = require ('fetch-node');

async function getAllRecipes() {

  try {
    let api = await fetch(API)
      .then(response => response.json());
    let bd = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    });

    let con = api.results.concat(bd);

    let resultado = con?.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe?.image,
        diets: recipe?.diets || recipe?.Diets.map(e => e.name),
        healthScore: recipe.healthScore,
      }
    });
    return resultado;
  } catch (error) {
    return error;
  }
}

async function getRecipe(id) {

  try {
    if (!isNaN(id)) {
      console.log("Entre al llamado de la api");
      let recipe = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        .then(response => response.json());
      if (recipe) {
        let result = {
          id: recipe.id,
          title: recipe.title,
          summary: recipe.summary,
          healthScore: recipe.healthScore,
          instructions: recipe.instructions,
          image: recipe?.image,
          diets: recipe?.diets,
        }
        return result;
      }


    }
    let result = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ['name'],
        through: {
          attributes: []
        },
      },
      plain: true
    }).then((response) => {
      return response.get({
        plain: true
      })
    })

    result.diets=result.Diets?.map(e => e.name);
    delete result['Diets'];
    return result;

  } catch (error) {
    return error;
  }
}

router.get('/', async (req, res) => {
  console.log("Entre al primer ID");
  let totalRecipes = await getAllRecipes();
  //console.log(totalRecipes);

  let title = req.query.name;
  console.log(title);
  if (title) {
    console.log("Entre al al title");
    let result = totalRecipes?.filter(e => e.title.toLowerCase().includes(title.toLowerCase()));
    if (result.length) {
      return res.json(result);
    }
    return res.status(404).send(`No se encontro una receta que contenga ${title}`);

  }

  return res.json(totalRecipes);

});

router.get('/:id', async (req, res) => {
  console.log("Entre a la ruta /:id");
  let { id } = req.params;

  try {
    let recipe = await getRecipe(id);
    console.log("Imprimo el recipe");
    console.log(recipe);
    res.json(recipe);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/', async (req, res) => {

  let { title, summary, healthScore, instructions, diets } = req.body;

  console.log(req.body);
  console.log(title);
  console.log(summary);
  console.log(healthScore);
  console.log(instructions);
  console.log(diets);

  try {
    if (title || summary) {

      let recipe = await Recipe.create({ title, summary, healthScore, instructions })

      await recipe.addDiet(diets);


      /* let result = await Recipe.findByPk(recipe.id, {
        include: [{
          model: 'Diets',
          attributes: ['id','name']
        }] 
      })*/


      /* let result = await Recipe.findAll({
        where:{
          id: recipe.id
        },
        include: 'Diets'
      }) */


      /* let result = await Recipe.findByPk(recipe.id,{
        raw:true,
        attributes: [[sequelize.col('Diets.name'),'name']] ,
        include:[{
          model:Diet,
          required:false,
          attributes:[]
        }],
      }); */


      //const tasks = await Recipe.findByPk(recipe.id,{ include: 'Diets' });

      const tasks = await Recipe.findByPk(recipe.id, {
        include: {
          model: Diet,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      })

      res.json(tasks);
    } else {
      res.status(404).send("No se ingresaron los datos obligatorios");
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }



});


module.exports = router;