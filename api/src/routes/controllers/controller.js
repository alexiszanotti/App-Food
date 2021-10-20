const axios = require("axios");
const { apiKey } = require("../../utils/config.js");
const { Recipe, Diet } = require("../../db.js");
const { Op } = require("sequelize");

const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`;

async function getRecipes() {
  const apiInfo = (await axios(url)).data.results.map(el => {
    return {
      Id: el.id,
      Title: el.title,
      Image: el.image,
      Diet: el.diets,
      score: el.spoonacularScore,
    };
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
      let dishTypes = recipes["dishTypes"];
      let spoonacularScore = recipes["spoonacularScore"];
      let healthScore = recipes["healthScore"];
      let instructions = recipes["instructions"];
      let summary = recipes["summary"];
      let diets = recipes["diet"];

      var detalleReceta = {
        id,
        title,
        image,
        dishTypes,
        spoonacularScore,
        healthScore,
        instructions,
        summary,
        diets,
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
    const { Title, summary, score, health_score, steps, diet, createdInDb } = req.body;

    const newRecipes = await Recipe.create({
      Title,
      summary,
      score,
      health_score,
      steps,
      createdInDb,
    });

    let dietDb = await Diet.findAll({
      where: {
        name: diet,
      },
    });

    newRecipes.addDiet(dietDb);

    res.send(newRecipes);
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
