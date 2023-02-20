const axios = require("axios");

const getRecipesFromApi = async () => {
  try {
    const response = await axios(
      `${process.env.API_BASE_URL}/complexSearch?apiKey=${process.env.API_KEY}&number=100&addRecipeInformation=true`
    );

    const recipesApi = response.data.results.map(
      ({ diets, dishTypes, title, id, readyInMinuts, healthScore, servings, image, summary }) => ({
        title,
        id,
        readyInMinuts,
        healthScore,
        servings,
        image,
        summary,
        diets,
        dishTypes,
      })
    );

    return recipesApi;
  } catch (error) {
    console.log(error);
  }
};

const getRecipeById = async recipeId => {
  const response = await axios(
    `${process.env.API_BASE_URL}/${recipeId}/information?apiKey=${process.env.API_KEY}`
  );

  const { id, title, image, summary, servings, healthScore, diets, analyzedInstructions } =
    response.data;

  const detailRecipe = {
    id,
    title,
    image,
    summary,
    servings,
    healthScore,
    diets,
    steps: analyzedInstructions[0].steps,
  };

  return detailRecipe;
};

module.exports = {
  getRecipesFromApi,
  getRecipeById,
};
