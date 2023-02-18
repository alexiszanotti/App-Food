const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password, name } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User is already in use",
      });
    }

    user = new User(req.body);

    //Encript password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "please contact the administrator",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    //Validate exist user
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "bad credentials",
      });
    }

    //Validate password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "bad credentials",
      });
    }

    //Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "please contact the administrator",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = { renewToken, loginUser, createUser };
