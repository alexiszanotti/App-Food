const express = require("express");
const { getTypes } = require("./controllers/controller");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let diets = await getTypes();
    diets ? res.status(200).send(diets) : res.status(400).send({ error: "Diets Not Found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
