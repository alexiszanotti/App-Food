const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbConnection = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.DB_CNN)
      .then(() => console.log("DB online"))
      .catch(error => console.log(error));
  } catch (error) {
    console.log(error);
    throw new Error("Error to connect db");
  }
};

module.exports = {
  dbConnection,
};
