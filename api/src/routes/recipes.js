const express = require("express");
const router = express.Router();
const { getRecipesById, getAllInfo } = require("./controllers/controller.js");

router.get("/", async (req, res, next) => {
  try {
    let { name } = req.query;
    let recipesTotal = await getAllInfo();
    console.log(recipesTotal.slice(0, 5));
    if (name) {
      let recipesName = await recipesTotal.filter(el =>
        el.Title.toLowerCase().includes(name.toLowerCase())
      );
      recipesName.length
        ? res.status(200).send(recipesName)
        : res.status(400).send({ error: "No recipes with that name were found" });
    } else {
      res.status(200).send(recipesTotal);
    }
  } catch (error) {
    next(error);
  }
});
router.get("/:idRecipe", getRecipesById);

module.exports = router;
