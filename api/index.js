const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routerAuth = require("./routes/auth.js");
const { dbConnection } = require("./database/config");

const app = express();

dbConnection();

//Middlewares
app.use(cors());
app.use(express.json());

//Rutas
app.use("/api/auth", routerAuth);

app.listen(process.env.PORT, () => {
  console.log(`Server listen in port ${process.env.PORT}`);
});

module.exports = app;
