const { Router } = require('express');
const Recipe = require('./Recipe.js');
const Diets = require('./Diets.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/diets',Diets);
router.use('/recipes',Recipe);
module.exports = router;
