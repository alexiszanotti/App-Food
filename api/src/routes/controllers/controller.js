const axios = require("axios");
const { apiKey } = require("../../utils/config.js");
const { Recipe, Diet } = require("../../db.js");
const { Op } = require("sequelize");

const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`;

async function getRecipes() {
  const apiInfo = (await axios(url)).data.results.map(el => {
    return { Id: el.id, Title: el.title, Image: el.image, Diet: el.diets };
  });
  return apiInfo;
}

async function getDbInfo() {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
}

async function getAllInfo() {
  const apiInfo = await getRecipes();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
}

async function getRecipesById(req, res, next) {
  const { idRecipe } = req.params;

  try {
    let recipes = (
      await axios(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${apiKey}`)
    ).data;

    if (idRecipe) {
      let id = recipes["id"];
      let title = recipes["title"];
      let image = recipes["image"];
      let tipoDieta = recipes["dishTypes"];
      let puntuacion = recipes["spoonacularScore"];
      let nivelSaludable = recipes["healthScore"];
      let pasoAPaso = recipes["analyzedInstructions"][0].steps;
      let resumenPlato = recipes["summary"];

      var detalleReceta = {
        Id: id,
        Titulo: title,
        Imagen: image,
        Tipo_Dieta: tipoDieta,
        Puntuacion: puntuacion,
        Nivel_Saludable: nivelSaludable,
        paso_a_paso: pasoAPaso,
        Resumen_Plato: resumenPlato,
      };
    }
    res.status(200).send(detalleReceta);
  } catch (error) {
    next(error);
  }
}

async function getTypes() {
  let diets = await Diet.findAll().then(res => res);

  return diets;
}

async function createRecipes(req, res, next) {
  try {
    let {
      nombre,
      resumen_receta,
      puntuacion,
      nivel_comida_saludable,
      paso_a_paso,
      dieta,
      createdInDb,
    } = req.body;

    let newRecipes = await Recipe.create({
      nombre,
      resumen_receta,
      puntuacion,
      nivel_comida_saludable,
      paso_a_paso,
      createdInDb,
    });

    let dietDb = await Diet.findAll({
      where: {
        name: dieta,
      },
    });

    newRecipes.addDiet(dietDb);
    res.send("Recipe created successfully");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRecipes,
  getRecipesById,
  getTypes,
  getDbInfo,
  createRecipes,
  getAllInfo,
};
