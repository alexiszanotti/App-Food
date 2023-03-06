/*
Recipes Route
host + /api/recipes 
*/

const { Router } = require("express");
const { body } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt.js");
const { validateFields } = require("../middlewares/validate-fields.js");
const {
  getRecipes,
  createRecipe,
  getRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipes");

const router = Router();

router.use(validateJWT);

router.get("/", getRecipes);

router.get("/:id", getRecipe);

router.post(
  "/",
  [
    body("title").notEmpty().withMessage("title is required"),
    body("summary").notEmpty().withMessage("summary is required"),
    body("spoonacularScore")
      .notEmpty()
      .withMessage("spoonacularScore is required")
      .isInt({ min: 1, max: 10 })
      .withMessage("numeric values between 1 and 10"),
    body("healthScore")
      .notEmpty()
      .withMessage("healthScore is required")
      .isInt({ min: 1, max: 100 })
      .withMessage("numeric values between 1 and 100"),
    body("steps").notEmpty().withMessage("steps is required"),
    validateFields,
  ],
  createRecipe
);

router.delete("/:id", deleteRecipe);

router.put(
  "/:id",
  [
    body("title").notEmpty().withMessage("title is required"),
    body("summary").notEmpty().withMessage("summary is required"),
    body("spoonacularScore")
      .notEmpty()
      .withMessage("spoonacularScore is required")
      .isInt({ min: 1, max: 10 })
      .withMessage("numeric values between 1 and 10"),
    body("healthScore")
      .notEmpty()
      .withMessage("healthScore is required")
      .isInt({ min: 1, max: 100 })
      .withMessage("numeric values between 1 and 100"),
    body("instructions").notEmpty().withMessage("instructions is required"),
    body("diets")
      .notEmpty()
      .withMessage("diets is required")
      .isArray()
      .withMessage("must be an array"),
    validateFields,
  ],
  updateRecipe
);

module.exports = router;
