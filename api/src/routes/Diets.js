const { Router } = require('express');
const { Op, Diet } = require('../db');
const router = Router();
const diets=['dairy free','vegetarian','vegan','lacto ovo vegetarian','paleolithic','primal','whole 30','pescatarian','ketogenic','fodmap friendly','gluten free'];
/* const diets = ['Gluten Free', 'Ketogenic', 'Vegerarian', 'Lacto-Vegetarian', 'Ovo Vegetarian', 'Vegan', ' Pescetarian', 'Paleo',
  'Primal', 'Low FODMAP', 'Whole30']; */

router.get('/', async (req, res) => {
  try {

    var list = await Diet.findAll();

    if (!list.length) {

      for (const name of diets) {
        const contents = await Diet.create({ name });
        list.push(contents);
      }
    }
    return res.json(list);
  } catch (error) {

  }
});

/* router.post('/', async (req, res) => {
  let { name } = req.body;

  try {
    let diet = await Diet.create({name});
    return res.json(diet);
  } catch (error) {

  }
}); */


module.exports = router;