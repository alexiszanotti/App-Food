const express = require("express");
const { createRecipes } = require("./controllers/controller");
const router = express.Router();

router.post("/", createRecipes);

module.exports = router;
