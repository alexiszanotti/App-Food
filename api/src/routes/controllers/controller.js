const axios = require("axios");
const { apiKey } = require("../../utils/config.js");
const { Recipe, Diet } = require("../../db.js");

const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`;

async function getRecipes() {
  try {
    const { data } = await axios(url);
    return data.results.map(el => {
      return {
        id: el.id,
        title: el.title,
        image: el.image,
        diets: el.diets,
        score: el.healthScore,
        readyInMinutes: el.readyInMinutes,
        servings: el.servings,
      };
    });
  } catch (error) {
    console.log(error);
  }
}

async function getDbInfo() {
  try {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function getAllInfo() {
  try {
    const apiInfo = await getRecipes();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  } catch (error) {
    console.log(error);
  }
}

async function getRecipesById(req, res, next) {
  const { idRecipe } = req.params;

  try {
    if (isNaN(idRecipe)) {
      let recipes = await Recipe.findAll({
        where: {
          id: idRecipe,
        },
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      res.status(200).json(recipes[0]);
    } else {
      let recipes = (
        await axios(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${apiKey}`)
      ).data;

      let diets = [];
      for (let i = 0; i < recipes.diets.length; i++) {
        diets.push({ name: recipes.diets[i] });
      }

      let newRecipes = {
        id: recipes["id"],
        title: recipes["title"],
        image: recipes["image"],
        summary: recipes["summary"],
        instructions: recipes["instructions"],
        dishTypes: recipes["dishTypes"],
        spoonacularScore: recipes["spoonacularScore"],
        healthScore: recipes["healthScore"],
        diets,
      };

      res.status(200).json(newRecipes);
    }
  } catch (error) {
    next(error);
  }
}

async function getTypes() {
  try {
    let diets = await Diet.findAll().then(res => res);

    return diets;
  } catch (error) {
    next(error);
  }
}

async function createRecipes(req, res, next) {
  try {
    const { title, summary, spoonacularScore, healthScore, instructions, diet } = req.body;

    const newRecipes = await Recipe.create({
      title,
      summary,
      spoonacularScore,
      healthScore,
      instructions,
    });

    let dietDb = await Diet.findAll({
      where: {
        name: diet,
      },
    });

    newRecipes.addDiet(dietDb);

    res.send("Recipe successfully created");
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
