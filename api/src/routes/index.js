const { Router } = require("express");
const Recipes = require("./recipes.js");
const Types = require("./types.js");
const Recipe = require("./recipe.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", Recipes);
router.use("/types", Types);
router.use("/recipe", Recipe);

module.exports = router;
