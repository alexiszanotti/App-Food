const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  return new Promise((res, rej) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          rej("Error token");
        }

        res(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
