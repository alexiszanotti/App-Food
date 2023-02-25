const mongoose = require("mongoose");

console.log(process.env.DB_CNN)

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
