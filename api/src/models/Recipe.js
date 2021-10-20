const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      Title: {
        //Title
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        //Summary
        type: DataTypes.TEXT,
        allowNull: false,
      },
      score: {
        //
        type: DataTypes.INTEGER,
      },
      health_score: {
        type: DataTypes.INTEGER,
      },
      steps: {
        type: DataTypes.TEXT,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
