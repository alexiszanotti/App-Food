const { response } = require("express");
const Recipe = require("../models/Recipes.js");
const { getRecipesFromApi, getRecipeById } = require("../helpers/recipes.js");

const getRecipes = async (req, res = response) => {
  try {
    const { name } = req.query;

    const recipesDb = await Recipe.find().populate("user", "name");
    const recipesApi = await getRecipesFromApi();

    const totalRecipes = [...recipesDb, ...recipesApi];
    if (name) {
      const foundRecipe = totalRecipes.filter(({ title }) =>
        title.toLowerCase().includes(name.toLowerCase())
      );
      return foundRecipe
        ? res.json(foundRecipe)
        : res.status(404).json({ msg: "Recipe not found" });
    }
    res.json(totalRecipes);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      ok: false,
      msg: "Recipes not found",
    });
  }
};

const updateRecipe = async (req, res = response) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);
    const uid = req.uid;

    if (!recipe) {
      res.status(404).json({
        ok: false,
        msg: "Recipe not found",
      });
    }

    if (recipe.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        msg: "Can't edit that recipe",
      });
    }

    const newRecipe = {
      ...req.body,
      user: uid,
    };

    const updateRecipe = await Recipe.findByIdAndUpdate(recipeId, newRecipe, {
      new: true,
    });

    res.json({
      ok: true,
      recipe: updateRecipe,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: "please contact the administrator",
    });
  }
};

const deleteRecipe = (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteRecipe",
  });
};

const getRecipe = async (req, res = response) => {
  const { id } = req.params;

  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const detailRecipe = await Recipe.findById(id);
      if (detailRecipe) {
        return res.json({
          ok: true,
          detailRecipe,
        });
      }
    }
    const detailRecipe = await getRecipeById(id);
    if (detailRecipe) {
      return res.json({
        ok: true,
        detailRecipe,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Recipe not found",
    });
  }
};

const createRecipe = async (req, res = response) => {
  const recipe = new Recipe(req.body);

  try {
    recipe.user = req.uid;

    const savedRecipe = await recipe.save();
    res.json({
      ok: true,
      savedRecipe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "please contact the administrator",
    });
  }
};

module.exports = {
  getRecipe,
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
