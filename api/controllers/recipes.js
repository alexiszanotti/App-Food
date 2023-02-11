const { response } = require("express");
const Recipe = require("../models/Recipes.js");

const getRecipes = async (req, res = response) => {
  const recipes = await Recipe.find().populate("user", "name");

  res.json({
    ok: true,
    recipes,
  });
};

const updateRecipe = async (req, res = response) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      res.status(404).json({
        ok: false,
        msg: "Recipe not found",
      });
    }
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
const getRecipe = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getRecipe",
  });
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
