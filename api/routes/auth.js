/*
Users Route
host + /api/auth
*/

const { Router } = require("express");
const { body } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/auth.js");
const { validateFields } = require("../middlewares/validate-fields.js");

const router = Router();

router.post(
  "/new",
  [
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().withMessage("email is required").isEmail(),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 5 })
      .withMessage("min 5 characters"),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    body("email").notEmpty().withMessage("email is required").isEmail(),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 5 })
      .withMessage("min 5 characters"),
    validateFields,
  ],
  loginUser
);

router.get("/renew", renewToken);

module.exports = router;
